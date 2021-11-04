import React, {useState} from "react";
import { Layout, Card, Button, Modal } from 'antd';
import getAllTic from '../interact/getAllTic'
import web3 from '../utils/Initweb3'

const { Meta } = Card;

function Tics(props) {
    // const [history, sethistory] = useState('');
    const [Condition, setCondition] = useState('');
    const [State, setState] = useState('');
    const [account, setaccount] = useState('');
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
            console.log("In tics");
            console.log(res);
            // const listItem = his.map((results) => 
            //     <p>{results}</p>
            // );
            // sethistory(listItem);
            switch(res.condition) {
                case "0": 
                    setCondition("new");
                    break;
                case "1":
                    setCondition("Old");
                    break;
                default:
                    setCondition("false");
            }
            switch(res.statu) {
                case "0": 
                    setState("Open");
                    break;
                case "1":
                    setState("Sold");
                    break;
                case '2':
                    setState("Unsold");
                    break;
                default:
                    setState("false");
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
            <p>新旧</p>
            {Condition}
            <p>状态</p>
            {State}
        </Modal>
        </Layout>
    )
}

export default Tics;