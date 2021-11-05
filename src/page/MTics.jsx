import React, {useState} from "react";
import { Layout, Card, Button, Modal, Table, Tag } from 'antd';
import getAllTic from '../interact/getAllTic'
import web3 from '../utils/Initweb3'
import NewAuc from './NewAuc';
import getHistory from "../interact/getHistory";

const { Meta } = Card;

function Tics(props) {
    const [history, sethistory] = useState('');
    const [Condition, setCondition] = useState('');
    const [State, setState] = useState('');
    const [account, setaccount] = useState('');
    const [color1, setcolor1] = useState('');
    const [color2, setcolor2] = useState('');
    const a = () => {
        web3.eth.getAccounts().then(function(results) {
            setaccount(results[0]);
        })
    }

    if (account==='') {
        a();
    }

    // console.log(props);
    const t=() => {
        getAllTic().then(function(result) {
            let res = result[props.id];
            console.log("In tics", res);
            // const listItem = his.map((results) => 
            //     <p>{results}</p>
            // );
            // sethistory(listItem);
            switch(res.condition) {
                case "0": 
                    setCondition("自己的");
                    setcolor1("blue")
                    break;
                case "1":
                    setCondition("买来的");
                    setcolor1('volcano')
                    break;
                default:
                    setCondition("false");
                    setcolor1("#f50");
            }
            switch(res.statu) {
                case "0": 
                    setState("自由状态");
                    setcolor2("lime")
                    break;
                case "1":
                    setState("拍卖中");
                    setcolor2("green")
                    break;
                case '2':
                    setState("流拍啦");
                    setcolor2("cyan");
                    break;
                default:
                    setState("false");
                    setState("#f50");
            }
        })
    }

    const [s, sets] = useState(true);

    if (s) {
        sets(false);
        
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
        getHistory(props.id).then(function(results) {
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
        
        t();
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
        title: '编号',
        dataIndex: 'hid',
        key: 'hid',
        },
        {
        title: '地址',
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
        <Layout className="site-layout-background" align="middle">
            <div onClick={showModal}>
            <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={props.image} />}
            >
            <Meta title={props.name} description={props.category} />
            </Card>
            </div>
        <Modal title={props.name} visible={isModalVisible} footer={[
            <Button key="submit" type="primary" onClick={handleOk}>
                确认
            </Button>,
            <NewAuc id={props.id}></NewAuc>
          ]}>
            <p>历史持有者(包括自己)</p>
            {gettablehis()}
            <p>新旧： <Tag color={color1}>{Condition}</Tag></p>
            <p>状态： <Tag color={color2}>{State}</Tag></p>
        </Modal>
        </Layout>
    )
}

export default Tics;