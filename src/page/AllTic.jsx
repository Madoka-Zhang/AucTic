import React, {useState} from 'react';
import ReactDOM from "react-dom";
import {Layout, Row, Col, Breadcrumb} from 'antd';
import Tics from './Tics';
import getAllTic from '../interact/getAllTic'

const { Content } = Layout;

function DrawAll() {
    getAllTic().then(function(results) {
        console.log("in then");
        console.log(results);
        const listItems = results.map((result) =>
            <Col span={6}>
                <Tics name={result.name} category={result.category} image={result.image}></Tics>
            </Col>
        );
        console.log(listItems);
        let tictic = (
            <Layout className="site-layout-background">
                <Row gutter={[16,24]}>
                    {
                        listItems
                    }
                </Row>
            </Layout>
        )
        // setDrawResult(listItems);
        // ReactDOM.render(tictic, document.getElementById('root'));
        return;
    });
    return;

    // return (
    //     {indents}
    // )
}

function AllTic() {
    const [DrawResult, setDrawResult] = useState('');
    const s = () => {
        getAllTic().then(function(results) {
            const listItems = results.map((result) =>
                <Col xs={{ span: 4, offset: 1 }} lg={{ span: 6, offset: 0 }}>
                    <Tics name={result.name} category={result.category} image={result.image} id={result.id}></Tics>
                </Col>
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
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>All</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                padding: 30,
                margin: 0,
                minHeight: 280,
                }}
            >
                <Row justify="space-around" gutter={[16, 24]} align="middle">
                    {DrawResult}
                </Row>
            </Content>
        </Layout>
    )
}

export default AllTic;

ReactDOM.render(
    <AllTic />,
    document.getElementById('root')
    )