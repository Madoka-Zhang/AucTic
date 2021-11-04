import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import { Layout, Menu, Typography, Space } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import '../App.css'
import HomePage from './HomePage';
import MyPage from './MyPage';
import CenterPage from './CenterPage';
import '../interact/checkout';
import checkout from '../interact/checkout';

const { SubMenu } = Menu;
const { Header, Footer } = Layout;
const { Title } = Typography;

function CorePage() {
    const [timer, setTimer] = useState(true);
    const [mnu, setmnu] = useState('1');

    useEffect(() => {
        let interval;
        if (timer) {
            interval = setInterval(() => {
                checkout().then(function() {
                    console.log("checkout finish!!");
                })
            }, 10000)
        } else {
          clearInterval(interval)
        }
        return () => clearInterval(interval);
      }, [timer])
    return (
        <Router>
            <Layout>
                <Header className="header">
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
                <Layout>
                    <Switch>
                        <Route exact path="/" component = {HomePage}></Route>
                        <Route path="/my" component = {MyPage}></Route>
                        <Route path="/center" component = {CenterPage}></Route>
                    </Switch>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>Designed by Madoka Zhang</Footer>
            </Layout>
        </Router>
    )
};

export default CorePage;

ReactDOM.render(
    <CorePage />,
    document.getElementById('root')
    )