import {useEffect, useState} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import IconMap from '../IconMap';

import SideBar from '../SideBar';
import "./index.scss";

import { Button, Layout, Dropdown, Space, Avatar } from 'antd';
const { Header, Content } = Layout;



export default function LayoutIndex(){
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [routerList, setRouterList] = useState([]);


    const handleExit = () => {
        localStorage.clear();
        navigate("/login");
    }

    const items = [
        {
            key: '1',
            label: (
                <span onClick={handleExit}>退出</span>
            )
        }
    ];

    

    useEffect(() => {
        // 获取左侧侧边栏路由表
        let routers = localStorage.getItem("routerList");
        if(routers != null){
            setRouterList(JSON.parse(routers));
        }
    }, []);

    return (
        <Layout className="layout_box">
            <SideBar routerList={routerList} collapsed={collapsed} />
            <Layout>
                <Header className="header_box">
                    <Button 
                        className='collapse_icon'
                        type="text"
                        icon={collapsed ? IconMap.rightArrow : IconMap.leftArrow}
                        onClick={() => setCollapsed(!collapsed)} />
                    <Dropdown menu={{items}} className='avatar_box'>
                        <a onClick={e => e.preventDefault()}>
                            <Space wrap>
                                <Avatar icon={IconMap.userIcon} />
                            </Space>
                        </a>
                    </Dropdown>
                </Header>
                <Content className='content_box'>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}