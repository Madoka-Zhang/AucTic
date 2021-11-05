import React, {useState} from 'react';
import ReactDOM from "react-dom";
import { Layout, Breadcrumb, Col, Row} from 'antd';

import '../App.css'
import MTics from './MTics';
import getAllTic from '../interact/getAllTic';
import web3 from '../utils/Initweb3';

const { Content } = Layout;

function MyTics() {
    const [DrawResult, setDrawResult] = useState('');
    const [myaccount, setmyaccount] = useState('');
    const a = () => {
        web3.eth.getAccounts().then(function(results) {
            setmyaccount(results[0]);
        })
    }
    if (myaccount === '') {
        a();
    }
    console.log(myaccount);
    const s = () => {
        getAllTic().then(function(results) {
            const listItems = results.map((result) => {
                if (result.owner === myaccount) {
                    return (
                        <Col span={5} offset={1}>
                            <MTics name={result.name} category={result.category} image={result.image} id={result.id}></MTics>
                        </Col>
                    )
                }
                else return ('')
            }
            );
            setDrawResult(listItems);
            // ReactDOM.render(tictic, document.getElementById('root'));
            return;
        });
    }
    if (DrawResult===''){
        s();
    }
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>My</Breadcrumb.Item>
                <Breadcrumb.Item>MyTics</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                }}
            >
                <Row gutter={[16, 24]} align="middle">
                    {DrawResult}
                </Row>
                
            </Content>
        </Layout>
    )
}

export default MyTics;

ReactDOM.render(
    <MyTics />,
    document.getElementById('root')
    )