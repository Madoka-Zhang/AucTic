import {Empty, Layout, Breadcrumb} from 'antd';
import ReactDom from 'react-dom'

const { Content } = Layout;

function HotTic() {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Hot</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                padding: 30,
                margin: 0,
                minHeight: 280,
                }}
            >
                <Empty />
            </Content>
        </Layout>
    )
}

export default HotTic;

ReactDom.render(<HotTic />, document.getElementById('root'));