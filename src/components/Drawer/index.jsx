import {useSelector} from "react-redux"
import {Drawer} from 'antd'

import IconMap from "../IconMap";

export default function DrawerComponent({title, interfaceName, id, render, reloadList}){
    let showDetailModel = useSelector(state => state.showDetailModel.data);

    const leftTitle = (
        <>
            <span>{IconMap.copy}</span>
            <span>{title}</span>
        </>
    )

    const extra = (
        <>
            <span className="icon">{IconMap.del}</span>
            <span className="line"></span>
            <span className="icon">{IconMap.close}</span>
        </>
    )

    return (
        <Drawer 
            title={leftTitle}
            placement="right"
            size={500}
            closable={false}
            open={showDetailModel} 
            extra={extra}>
            {render && render()}
        </Drawer>
    )
}
