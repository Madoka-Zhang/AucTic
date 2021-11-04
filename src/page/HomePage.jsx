import React from 'react';
import ReactDOM from "react-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import '../App.css'
import NewTic from './NewTic';
import AllTic from './AllTic';
import HotTic from './HotTic';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

function HomePage() {
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
                    <SubMenu key="sub1" icon={<LaptopOutlined />} title="查看">
                    <Menu.Item key="1">
                        <Link to="/">    
                            所有Tic
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/hot">    
                            热门Tic
                        </Link>
                    </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<UserOutlined />} title="制作Tics">
                    <Menu.Item key="3">
                        <Link to="/new">
                            新建
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/load">    
                            导入
                        </Link>
                    </Menu.Item>
                    </SubMenu>
                </Menu>
                </Sider>
                <Layout style={{ padding: '0px 200px 0px'}}>
                    <Switch>
                        <Route path="/new" component={NewTic}></Route>
                        <Route path="/load" ></Route>
                        <Route exact path="/" component={AllTic}></Route>
                        <Route path="/hot" component={HotTic}></Route>
                    </Switch>
                </Layout>
            </Layout>
        </Router>
    )
};

export default HomePage;

ReactDOM.render(
    <HomePage />,
    document.getElementById('root')
    )