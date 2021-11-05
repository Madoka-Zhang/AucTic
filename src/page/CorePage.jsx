import React from 'react';
import ReactDOM from "react-dom";
import { Layout, Menu } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import '../App.css'
import HomePage from './HomePage';
import MyPage from './MyPage';
import CenterPage from './CenterPage';
import '../interact/checkout';
const { Header, Footer } = Layout;

function CorePage() {
    document.title="TicAuc"
        return (
        <Router>
            <Layout>
                <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link exact to="/">
                            主页
                        </Link>
                    </Menu.Item> 
                    <Menu.Item key="2">
                        <Link to="/my">
                            我的
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/center">
                            拍卖中心
                        </Link>
                    </Menu.Item>
                    </Menu>
                </Header>
                <Layout style={{ padding: '0 50px', marginTop: 64 }}>
                    <Switch>
                        <Route exact path="/" component = {HomePage}></Route>
                        <Route path="/my" component = {MyPage}></Route>
                        <Route path="/center" component = {CenterPage}></Route>
                    </Switch>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>Designed by Madoka Zhang for Blockchain Project</Footer>
            </Layout>
        </Router>
    )
};

export default CorePage;

ReactDOM.render(
    <CorePage />,
    document.getElementById('root')
    )