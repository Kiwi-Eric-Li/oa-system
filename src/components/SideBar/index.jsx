import {useState} from 'react';
import {Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import "./index.scss";
import IconMap from '../IconMap';
const { Sider } = Layout;


export default function SideBar({routerList}){

    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <Sider trigger={null} className="side_bar" collapsible collapsed={collapsed}>
            <div className="brand">
                <h1>OA SYSTEM</h1>
            </div>
            <Menu
                theme="light"
                mode="inline" 
                selectedKeys={[pathname]}>
                {routerList.map(item => {
                    return (
                        <Menu.Item key={item.route}>
                            <Link to={item.route}>
                                {IconMap[item.icon]}
                                <span>{item.zhName}</span>
                            </Link>
                        </Menu.Item>
                    )
                })}
            </Menu>
        </Sider>
    )
}