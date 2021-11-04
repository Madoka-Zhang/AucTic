import React, {useState} from 'react';
import ReactDOM from "react-dom";
import { Drawer, Form, Input, Layout, Breadcrumb, Col, Row, Table, Tag, Space, Button, notification} from 'antd';

import '../App.css'
import MTics from './MTics';
import web3 from '../utils/Initweb3';
import getAllAuc from '../interact/getAllAuc';
import bidOnce from '../interact/bidOnce';
import claim from '../interact/claim';
import withDraw from '../interact/withDraw';

const { Content } = Layout;
const { Column, ColumnGroup } = Table;

function BidCenter() {
    const [DrawResult, setDrawResult] = useState('');
    const [myaccount, setmyaccount] = useState('');
    const [visible, setvisible] = useState(false);
    const [price, setprice] = useState(0);
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
            const listItems = (results.filter((result) => {
                var date = new Date(parseInt(result.timeEnd));
                console.log("time Ed: ", result.timeEnd);
                if (result.creater !== myaccount) {
                    return true;
                }
                return false;
            })).map((result) => {
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
                        timeStart: stdate.toLocaleString(),
                        timeEnd: eddate.toLocaleString(),
                        t1: result.timeBegin,
                        t2: result.timeEnd,
                        state: sd,
                        highestBid: web3.utils.fromWei(result.highestBid),
                        highestBidder: result.highestBidder,
                        bid: [result.totalBids],
                    }
                )
            })
            setDrawResult(listItems);
            console.log("list result:", listItems);
            // ReactDOM.render(tictic, document.getElementById('root'));
            
        });
    }

    const onClose = () => {
        setvisible(false);
        console.log(visible);
    }
    
    const onChange = (value) => {
        setprice(value.target.value);
    }

    const [pe, setpe] = useState(0);
    const [st, setst] = useState(0);
    const [ed, seted] = useState(0);

    const onClickbtn = (id, price, stz, ebd) => {
        console.log("Aucid: ", id);
        setAucid(id);
        setvisible(true);
        setpe(price);
        setst(stz);
        seted(ebd);
        console.log("pdddset : ", id, price, stz, ebd);
        return false;
    }

    const onClickget = (index, winner, state, tic) => {
        claim(index, tic);
        console.log("onclickget", index, tic);
    }

    const onClickped = () => {
        withDraw().then(function() {
            console.log("withDraw end");
        })
    }

    const [x, setx] = useState(true);
    if (x&&myaccount!==''){
        setx(false);
        s()
    }

    const [title, settitle] = useState('');
    const [descrip, setdescrip] = useState('');

    const openNotification = type => {
        notification[type]({
            message: `"234" ${title}`,
            description: `234 ${descrip}`,
        });
    };

    const dobidOnce = (Aucid, price) => {
        let now = new Date();
        setvisible(false);
        let n = parseInt(now.valueOf()/1000);
        if (n<st) {
            settitle('Error');
            setdescrip('unstart');
            openNotification('error');
        }
        else if (n>ed) {
            settitle('Error');
            setdescrip('ended');
            openNotification('error');
        }
        else if (price < pe) {
            settitle('Error');
            setdescrip('no money');
            openNotification('error');
        }
        else {
            bidOnce(Aucid, price, n).then(function() {
                settitle('Success');
                setdescrip("ohhhhhhh!");
                openNotification('success');
            })
        }
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
                <Table dataSource={DrawResult}>
                    <Column title="序号" dataIndex="Aucid" key="Aucid" />
                    <Column title="发起者" dataIndex="creater" key="creater" />
                    <Column title="Tic" dataIndex="item" key="item" />
                    <Column title="开始时间" dataIndex="timeStart" key="timeStart" />
                    <Column title="结束时间" dataIndex="timeEnd" key="timeEnd" />
                    <Column title="价格" dataIndex="highestBid" key="highestBid" />
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
                            let s = (record.state==2&&myaccount==record.highestBidder)?false:true;
                            console.log("dddddbuttonvisible: ", s, record.state, myaccount, record.highestBidder);
                            return (<div>
                                    <Button onClick={()=>onClickbtn(record.Aucid, record.highestBid, record.t1, record.t2)} type="primary">出价 {record.Aucid}</Button>
                                    <Button onClick={()=>onClickget(record.Aucid, record.highestBidder, record.state, record.item)} disabled={s}>领取 {record.Aucid}</Button>
                                    <Button onClick={()=>onClickped()}>返钱 {record.Aucid}</Button>
                                    </div>
                                )
                        }
                    }
                    />
                </Table>
                <Drawer
                title="拍卖"
                width={360}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                        name="出价"
                        label="price"
                        rules={[{ required: true, message: 'Please enter your price' }]}
                        >
                        <Input placeholder="Please enter your price" onChange={onChange}/>
                        </Form.Item>
                    </Col>
                    </Row>
                    
                    <Row gutter={16}>
                    <Col span={12}>
                        <Button onClick={onClose}>取消</Button>
                    </Col>
                    <Col span={12}>
                        <Button type="primary" onClick={()=>dobidOnce(Aucid, price)}>确认</Button>
                    </Col>
                    </Row>
                </Form>
                </Drawer>
            </Content>
        </Layout>
    )
}

export default BidCenter;

ReactDOM.render(
    <BidCenter />,
    document.getElementById('root')
    )