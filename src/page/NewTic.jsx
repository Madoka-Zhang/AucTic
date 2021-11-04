import React, {useState} from 'react';
import ReactDOM from "react-dom";
import { Layout, Breadcrumb, Input, Space, Typography, Radio, Button} from 'antd';

import '../App.css'
import castTic from '../interact/Interact'

const { Content } = Layout;
const { Text } = Typography

function NewTic() {
    const [name, setname] = useState('');
    const [url, seturl] = useState('');
    const [category, setcategory] = useState('');

    const onChangename = (value) => {
        setname(value.target.value);
    }

    const onChangeurl = (value) => {
        seturl(value.target.value);
        console.log("url: ", url);
    }

    const onChangeCategory = (value) => {
        setcategory(value.target.value);
    }

    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>newTic</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                }}
            >
                
                <Space direction="horizontal" align="center">
                    <Text>名\ \ 称</Text> 
                    <Input placeholder="Basic usage" maxLength={25} onChange={onChangename}/>
                </Space>
                <br/><br/>
                <Space direction="horizontal" align="center">
                    <Text>图片Url</Text>
                    <Input placeholder="Basic usage" onChange={onChangeurl}/>
                </Space>
                <br/><br/>
                <Space direction="horizontal" align="center">
                    <Text>分类</Text>
                    <Radio.Group onChange={onChangeCategory}>
                    <Radio value={'A'}>A</Radio>
                    <Radio value={'B'}>B</Radio>
                    <Radio value={'C'}>C</Radio>
                    <Radio value={'D'}>D</Radio>
                    </Radio.Group>
                </Space>
                <br/><br />
                <Button type="primary" margin="center" onClick={castTic(name, url, category)}>
                    提交
                </Button>
            </Content>
        </Layout>
    )
}

export default NewTic;

ReactDOM.render(
    <NewTic />,
    document.getElementById('root')
    )