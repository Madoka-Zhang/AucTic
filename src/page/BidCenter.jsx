import React, {useState } from 'react';
import ReactDOM from "react-dom";
import { Drawer, Form, Input, Layout, Breadcrumb, Col, Row, Table, Tag, Button, notification, Modal} from 'antd';

import '../App.css'
import web3 from '../utils/Initweb3';
import getAllAuc from '../interact/getAllAuc';
import bidOnce from '../interact/bidOnce';
import claim from '../interact/claim';
import withDraw from '../interact/withDraw';
import getpending from '../interact/getpending';
import getHistory from "../interact/getHistory";

const { Content } = Layout;
const { Column } = Table;

function BidCenter() {
    const [history, sethistory] = useState('');
    const [DrawResult, setDrawResult] = useState('');
    const [myaccount, setmyaccount] = useState('');
    const [visible, setvisible] = useState(false);
    const [price, setprice] = useState(0);
    const [Aucid, setAucid] = useState(0);
    const [pe, setpe] = useState(0);
    const [st, setst] = useState(0);
    const [ed, seted] = useState(0);
    const [pending, setpending] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (id) => {
        setIsModalVisible(true);
        getHistory(id).then(function(results) {
            var i = 0;
            const listItems = results.map(function(res) {
                i = i + 1;
                return (
                    {
                        hid :i,
                        haddress: res,
                    }
                )
            })
            console.log("sethistory", listItems);
            sethistory(listItems);
        })
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const a = () => {
        web3.eth.getAccounts().then(function(results) {
            setmyaccount(results[0]);
        })
    }

    const gtpending = () => {
        getpending().then(function(pend) {
            setpending(pend);
        })
    }

    if (myaccount === '') {
        a();
        gtpending();
    }
    console.log("input myacount: ", myaccount);
    const s = () => {
        getAllAuc().then(function(results) {
            const listItems = (results.filter((result) => {
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
        claim(index, tic).then(function() {
            window.location.assign("http://localhost:3000/");
        });
        console.log("onclickget", index, tic);
    }

    const onClickped = () => {
        withDraw().then(function() {
            console.log("withDraw end");
            window.location.assign("http://localhost:3000/");
        })
    }

    const [x, setx] = useState(true);
    if (x&&myaccount!==''){
        setx(false);
        s()
    }

    const openNotification = type => {
        notification[type]({
            message: `Error`,
            description: `????????????????????????????????????`,
        });
    };

    const openNotification1 = type => {
        notification[type]({
            message: `Success`,
            description: `????????????`,
        });
    };

    const dobidOnce = (Aucid, price) => {
        let now = new Date();
        setvisible(false);
        let n = parseInt(now.valueOf()/1000);
        if (price < pe) {
            openNotification('error');
        }
        else {
            bidOnce(Aucid, price, n).then(function() {
                openNotification1('success');
                setTimeout(() => {
                    window.location.assign("http://localhost:3000/");
                }, 1000);
            })
        }
    }

    const columns = [
        {
        title: '??????',
        dataIndex: 'hid',
        key: 'hid',
        },
        {
        title: '??????',
        dataIndex: 'haddress',
        key: 'haddress',
        },
    ];

    const gettablehis = () => {
        return (
            <Table dataSource={history} columns={columns} />
        )
    }

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Auction</Breadcrumb.Item>
                <Breadcrumb.Item>AucCenter</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                }}
            >
                <Layout>
                    <Tag color="green">???????????????{pending}</Tag>
                </Layout>
                <Table dataSource={DrawResult} rowKey='Aucid' expandedRowRender={(record) => this.expandedRowRender(record)}
                  expandable={{
                    expandedRowRender: record => <p style={{ margin: 0 }}>????????????{record.creater}</p>,
                    rowExpandable: record => record.name !== 'Not Expandable',
                  }}>
                    <Column title="??????" dataIndex="Aucid" key="Aucid" sorter={(a, b)=>a.Aucid-b.Aucid}/>
                    {/* <Column title="?????????" dataIndex="creater" key="creater" sorter={(a, b)=>a.creater-b.creater}/> */}
                    <Column title="Tic" dataIndex="itemname" key="itemname" sorter={(a,b)=>a.item-b.item}
                        render={(id, record) => (
                            <a href="#" onClick={() => showModal(record.item)}>{id}</a>
                        )}/>
                    <Column title="????????????" dataIndex="timeStart" key="timeStart" sorter={(a, b)=>a.timeStart-b.timeStart}/>
                    <Column title="????????????" dataIndex="timeEnd" key="timeEnd" sorter={(a, b)=>a.timeEnd-b.timeEnd}/>
                    <Column title="??????" dataIndex="highestBid" key="highestBid" sorter={(a, b)=>a.highestBid-b.highestBid}/>
                    <Column title="??????" dataIndex="secondBid" key="secondBid" sorter={(a, b)=>a.secondBid-b.secondBid}/>
                    <Column title="???????????????" dataIndex="highestBidder" key="highestBidder" sorter={(a, b)=>a.highestBidder-b.highestBidder}/>
                    <Column
                    title="????????????"
                    dataIndex="bid"
                    key="bid"
                    sorter={(a, b)=>a.bid-b.bid}
                    render={tags => (
                        <p>
                        
                            <Tag color="blue" key={tags}>
                            {tags}
                            </Tag>
                        </p>
                    )}
                    />
                    <Column title="??????" dateIndex="state" key="state"
                    filters={[{text:'?????????',value:0},{text:'?????????',value:1},{text:'?????????',value:2}]}
                    onFilter={(value, record)=>record.state === value}
                    render={status => {
                        let st = status.state;
                        console.log("render.status", st);

                        let color = st==0?"gray":(st==1?"green":"volcano");
                        let tag = st==0?"?????????":(st==1?"?????????":"?????????");
                        console.log("render color tag", color, tag);
                        return <Tag color={color}>{tag}</Tag>
                    }}/>
                    <Column
                    title="Action"
                    key="action"
                    render={(text, record) => {
                            let c = (record.state==1)?false:true;
                            let s = (record.state==2&&myaccount==record.highestBidder&&record.st<2)?false:true;
                            let p = (pending==0?true:false);
                            console.log("dddddbuttonvisible: ", s, record.state, myaccount, record.highestBidder);
                            return (<div>
                                    <Button onClick={()=>onClickbtn(record.Aucid, record.highestBid, record.t1, record.t2)} type="primary" disabled={c}>?????? {record.Aucid}</Button>
                                    <Button onClick={()=>onClickget(record.Aucid, record.highestBidder, record.state, record.item)} disabled={s}>?????? {record.Aucid}</Button>
                                    <Button onClick={()=>onClickped()} disabled={p}>?????? {record.Aucid}</Button>
                                    </div>
                                )
                        }
                    }
                    />
                </Table>
                <Drawer
                title="??????"
                width={360}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                        name="??????"
                        label="price"
                        rules={[{ required: true, message: 'Please enter your price' }]}
                        >
                        <Input placeholder="Please enter your price" onChange={onChange}/>
                        </Form.Item>
                    </Col>
                    </Row>
                    
                    <Row gutter={16}>
                    <Col span={12}>
                        <Button onClick={onClose}>??????</Button>
                    </Col>
                    <Col span={12}>
                        <Button type="primary" onClick={()=>dobidOnce(Aucid, price)}>??????</Button>
                    </Col>
                    </Row>
                </Form>
                </Drawer>
            </Content>
            <Modal title="????????????" visible={isModalVisible} onOk={handleOk}>
                {gettablehis()}
            </Modal>
        </Layout>
    )
}

export default BidCenter;

ReactDOM.render(
    <BidCenter />,
    document.getElementById('root')
    )