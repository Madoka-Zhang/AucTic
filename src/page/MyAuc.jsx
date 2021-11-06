import React, {useState} from 'react';
import ReactDOM from "react-dom";
import { Layout, Breadcrumb, Col, Row, Table, Tag, Space, Button} from 'antd';

import '../App.css'
import MTics from './MTics';
import web3 from '../utils/Initweb3';
import getAllAuc from '../interact/getAllAuc';
import endAuction from '../interact/endAuction';

const { Content } = Layout;
const { Column, ColumnGroup } = Table;

function MyAuc() {
    const [DrawResult, setDrawResult] = useState('');
    const [myaccount, setmyaccount] = useState('');
    const [visible, setvisible] = useState(false);
    const [Aucid, setAucid] = useState(0);
    const a = () => {
        web3.eth.getAccounts().then(function(results) {
            setmyaccount(results[0]);
        })
    }
    if (myaccount === '') {
        a();
    }
    console.log("input myacount: ", myaccount);
    const s = () => {
        getAllAuc().then(function(results) {
            const listItems = results.filter((result) => {
                var date = new Date(parseInt(result.timeEnd));
                console.log("date: ", date);
                console.log("category", result.totalBids)
                console.log("myaccount:", myaccount, "resultowner", result.creater);
                if (result.creater === myaccount) {
                    return true;
                }
                return false;
            }).map((result) => {
                var stdate = new Date(parseInt(result.timeBegin*1000));
                var eddate = new Date(parseInt(result.timeEnd*1000));
                var now = new Date();
                let sd = now<stdate?0:(now<eddate?1:2);
                console.log("now st ed sd", now, stdate, eddate, sd);
                return (
                    {
                        Aucid: result.Aucid,
                        creater: result.creater,
                        item: result.item,
                        itemname: result.itemname,
                        timeStart: stdate.toLocaleString(),
                        timeEnd: eddate.toLocaleString(),
                        t1: result.timeBegin,
                        t2: result.timeEnd,
                        state: sd,
                        highestBid: web3.utils.fromWei(result.highestBid),
                        highestBidder: result.highestBidder,
                        secondBid: web3.utils.fromWei(result.secondBid),
                        bid: [result.totalBids],
                        st: result.status,
                    }
                )
            })
            setDrawResult(listItems);
            console.log("result:", listItems);
            // ReactDOM.render(tictic, document.getElementById('root'));
            
        });
    }

    const onClickbtn = (Aucid, tic) => {
        console.log("Aucid: ", Aucid, tic);
        // setAucid(id);
        // setvisible(true);
        endAuction(Aucid, tic).then(function() {
            console.log("end endAuction!");
            window.location.assign("http://localhost:3000/");
        })
        return false;
    }

    const onClickget = () => {

    }

    const [x, setx] = useState(true);
    if (x&&myaccount!==''){
        setx(false);
        s()
    }
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>My</Breadcrumb.Item>
                <Breadcrumb.Item>MyAuc</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                }}
            >
                <Table dataSource={DrawResult} rowKey='creater' expandedRowRender={(record) => this.expandedRowRender(record)}
                  expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>发起者：{record.creater}</p>,
                    rowExpandable: record => record.name !== 'Not Expandable',
                  }}>
                <Column title="序号" dataIndex="Aucid" key="Aucid" sorter={(a, b)=>a.Aucid-b.Aucid}/>
                    {/* <Column title="发起者" dataIndex="creater" key="creater" sorter={(a, b)=>a.creater-b.creater}/> */}
                    <Column title="Tic" dataIndex="itemname" key="itemname" sorter={(a,b)=>a.item-b.item} />
                    <Column title="开始时间" dataIndex="timeStart" key="timeStart" sorter={(a, b)=>a.timeStart-b.timeStart}/>
                    <Column title="结束时间" dataIndex="timeEnd" key="timeEnd" sorter={(a, b)=>a.timeEnd-b.timeEnd}/>
                    <Column title="价格" dataIndex="highestBid" key="highestBid" sorter={(a, b)=>a.highestBid-b.highestBid}/>
                    <Column title="次价" dataIndex="secondBid" key="secondBid" sorter={(a, b)=>a.secondBid-b.secondBid}/>
                    <Column title="最高出价者" dataIndex="highestBidder" key="highestBidder" sorter={(a, b)=>a.highestBidder-b.highestBidder}/>
                    <Column
                    title="竞拍次数"
                    dataIndex="bid"
                    key="bid"
                    render={tags => (
                        <p>
                        
                            <Tag color="blue" key={tags}>
                            {tags}
                            </Tag>
                        </p>
                    )}
                    />
                    <Column title="状态" dateIndex="state" key="state"
                    render={status => {
                        let st = status.state;
                        console.log("render.status", st);

                        let color = st==0?"gray":(st==1?"green":"volcano");
                        let tag = st==0?"未开始":(st==1?"进行中":"已结束");
                        console.log("render color tag", color, tag);
                        return <Tag color={color}>{tag}</Tag>
                    }}/>
                    <Column
                    title="Action"
                    key="action"
                    render={(text, record) => {
                        let s = (record.st==2&&0!=record.highestBidder)?false:true;
                        let t = (record.st!=3&&record.state==2&&0==record.highestBidder)?false:true;
                        console.log("statusal: ", record.Aucid, record.time);
                            return (<div>
                                    <Button onClick={()=>onClickbtn(record.Aucid, record.item)} type="primary" disabled={s}>收钱 {record.Aucid}</Button>
                                    <Button onClick={()=>onClickbtn(record.Aucid, record.item)} disabled={t}>流拍 {record.Aucid}</Button>
                                    </div>
                                )
                        }
                    }
                    />
                </Table>
                
            </Content>
        </Layout>
    )
}

export default MyAuc;

ReactDOM.render(
    <MyAuc />,
    document.getElementById('root')
    )