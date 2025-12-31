import {useEffect, useState} from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import "./index.scss";
import IconMap from '../IconMap';
const { Sider } = Layout;


export default function SideBar({routerList, collapsed}){
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [items, setItems] = useState([]);

    useEffect(() => {
        let result = [];
        routerList.forEach(item => {
            result.push({
                key: item.route,
                icon: IconMap[item.icon],
                label: item.zhName
            })
        });
        setItems(result);
    }, [routerList])

    return (
        <Sider trigger={null} className="side_bar" collapsible collapsed={collapsed}>
            <div className="brand">
                <h1>OA SYSTEM</h1>
            </div>
            <Menu
                theme="light"
                mode="inline" 
                selectedKeys={[pathname]} 
                onClick={({ key }) => navigate(key)}
                items={items} />
        </Sider>
    )
}