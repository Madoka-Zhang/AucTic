import React, {useState} from 'react';
import ReactDOM from "react-dom";
import { Layout, Breadcrumb, Input, Radio, Button, Row, Col, Modal, Image, Form } from 'antd';

import '../App.css'
import castTic from '../interact/Interact'

const { Content } = Layout;

function NewTic() {
    const [name, setname] = useState('');
    const [url, seturl] = useState('');
    const [category, setcategory] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onClickSubmit = (name, url, category) => {
        console.log("testconclicksubmit: ", name, url, category);
        if (name !== '' && url !== '' && category !== '') {
            castTic(name, url, category).then(function() {
                window.location.assign("http://localhost:3000/");
            });
        }
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
                <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item
                    label="名称"
                    name="name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input Tic name!',
                    },
                    ]}
                >
                    <Input onChange={onChangename} ref="nameinput"/>
                </Form.Item>

                <div style={{ overflow: 'hidden' }}>
                    <Form.Item
                    name="url"
                    label="图片url"
                    rules={[
                        { required: true },
                        { type: 'url', warningOnly: true },
                        { type: 'string', min: 6 },
                    ]}
                    >
                        <Input placeholder="input placeholder" onChange={onChangeurl} ref="urlinput"/>
                    </Form.Item>
                </div>

                <Form.Item
                    label="分类"
                    name="category"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Radio.Group onChange={onChangeCategory} ref="radioinput">
                        <Radio value={'A'}>A</Radio>
                        <Radio value={'B'}>B</Radio>
                        <Radio value={'C'}>C</Radio>
                        <Radio value={'D'}>D</Radio>
                    </Radio.Group>
                </Form.Item>
                    
                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Button type="primary" margin="center" onClick={showModal}>预览图片</Button>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" margin="center" onClick={() => onClickSubmit(name, url, category)}>提交</Button>
                </Form.Item>
                </Form>
            </Content>
            <Modal title="图片预览" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} centered="true">
                <Row justify="space-around"><Col>
                    <Image width={200} src={url} />
                </Col></Row>
            </Modal>
        </Layout>
    )
}

export default NewTic;

ReactDOM.render(
    <NewTic />,
    document.getElementById('root')
    )