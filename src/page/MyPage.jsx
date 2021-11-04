import React from 'react';
import ReactDOM from "react-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MyAuc from './MyAuc';

import '../App.css'
import MyTics from './MyTics';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

function MyPage() {
    return (
        <Router>
            <Layout>
                <Sider width={200} className="site-layout-background" style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="sub1" icon={<UserOutlined />}>
                        <Link to="/my">
                        我的Tics
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<UserOutlined />}>
                        <Link to="/myauc">
                        我的拍卖
                        </Link>
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout style={{ padding: '0 200px 0px' }}>
                    <Switch>
                        <Route path="/my" component={MyTics}></Route>
                        <Route path="/myauc" component={MyAuc}></Route>
                    </Switch>
                </Layout>
            </Layout>
        </Router>
    )
};

export default MyPage;

ReactDOM.render(
    <MyPage />,
    document.getElementById('root')
    )