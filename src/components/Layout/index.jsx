import {useEffect, useState} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"

import IconMap from '../IconMap';
import SideBar from '../SideBar';
import "./index.scss";
import {toggleCollapse} from "../../store/modules/collapseReducer"

import { Button, Layout, Dropdown, Space, Avatar } from 'antd';
const { Header, Content } = Layout;



export default function LayoutIndex(){
    const navigate = useNavigate();
    let collapse = useSelector(state => state.collapse.data);
    const [routerList, setRouterList] = useState([]);
    const dispatch = useDispatch();


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

    const handleCollapse = () => {
        dispatch(toggleCollapse(!collapse));
    }


    return (
        <Layout className="layout_box">
            <SideBar routerList={routerList} collapsed={collapse} />
            <Layout>
                <Header className="header_box">
                    <Button 
                        className='collapse_icon'
                        type="text"
                        icon={collapse ? IconMap.rightArrow : IconMap.leftArrow}
                        onClick={handleCollapse} />
                    <Dropdown menu={{items}} className='avatar_box'>
                        <a onClick={e => e.preventDefault()}>
                            <Space wrap>
                                <span>管理员</span>
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