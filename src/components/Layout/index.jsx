import {useEffect, useState} from 'react'
import {Outlet} from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import SideBar from '../SideBar';

import { Button, Layout } from 'antd';
const { Header, Content } = Layout;



export default function LayoutIndex(){
    const [collapsed, setCollapsed] = useState(false);
    
    const [routerList, setRouterList] = useState([]);

    useEffect(() => {
        // 获取左侧侧边栏路由表
        let routers = localStorage.getItem("routerList");
        console.log(JSON.parse(routers));
        if(routers != null){
            setRouterList(JSON.parse(routers));
        }
    }, []);

    return (
        <Layout style={{'height': '100vh'}}>
            <SideBar routerList={routerList}/>
            <Layout>
                <Header style={{ padding: 0}}>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                    }}
                />
                </Header>
                <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280
                }}
                >
                <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}