import React, {useState} from "react";
import { Layout, Card, Button, Modal, Tag } from 'antd';
import getAllTic from '../interact/getAllTic'
import web3 from '../utils/Initweb3'

const { Meta } = Card;

function Tics(props) {
    // const [history, sethistory] = useState('');
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
                    setCondition("新的");
                    setcolor1("blue")
                    break;
                case "1":
                    setCondition("旧的");
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

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        t();
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
        <Modal title={props.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
            <Button key="cancel" onClick={handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
            确认
            </Button>
          ]}>
            <p>新旧： <Tag color={color1}>{Condition}</Tag></p>
            <p>状态： <Tag color={color2}>{State}</Tag></p>
        </Modal>
        </Layout>
    )
}

export default Tics;