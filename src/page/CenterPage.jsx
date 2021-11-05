import React from 'react';
import ReactDOM from "react-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BidCenter from './BidCenter';
import BidSuccess from './BidSuccess';
import '../App.css'

const { Content, Sider } = Layout;

function CenterPage() {
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
                
                <Menu.Item key="1">
                    <Link to="/center">
                    拍卖广场
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/success">
                    拍卖成功
                    </Link>
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout style={{ padding: '0px 0px 0px 200px' }}>
                <Switch>
                    <Route path="/center" component={BidCenter}></Route>
                    <Route path="/success" component={BidSuccess}></Route>
                </Switch>
            </Layout>
        </Layout>
        </Router>
    )
};

export default CenterPage;

ReactDOM.render(
    <CenterPage />,
    document.getElementById('root')
    )