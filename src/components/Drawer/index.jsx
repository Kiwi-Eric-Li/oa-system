import {useSelector, useDispatch} from "react-redux"
import {Drawer, Modal} from 'antd'

import IconMap from "../IconMap";
import "./index.scss";
import {toggleShowDetailModel} from '../../store/modules/showDetailModelReducer';

export default function DrawerComponent({title, interfaceName, id, render, reloadList}){
    let showDetailModel = useSelector(state => state.showDetailModel.data);
    let dispatch = useDispatch();

    const closeDialog = () => {
        dispatch(toggleShowDetailModel(false));
    }

    const openModelDialog = () => {
        Modal.confirm({
            title: '温馨提示',
            content: '确认删除当前用户信息吗？',
            okText: "确定",
            cancelText: "取消",
            onOk: _delItem,
        });
    }

    const _delItem = () => {

    }

    const leftTitle = (
        <>
            <span className="icon">{IconMap.copy}</span>
            <span>{title}</span>
        </>
    )

    const extra = (
        <>
            <span className="icon" onClick={openModelDialog}>{IconMap.del}</span>
            <span className="line"></span>
            <span className="icon" onClick={closeDialog}>{IconMap.close}</span>
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
