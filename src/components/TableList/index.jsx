import { useState } from 'react';
import {useDispatch} from 'react-redux';
import {Table, message} from 'antd'

import {EditableRow, EditableCell} from '../Editable'
import Columns from './Columns';
import Dialog from '../Dialog';
import RecordTable from '../RecordTable';
import { setDetailModelData } from '../../store/modules/detailModelDataReducer';
import {toggleShowDetailModel} from '../../store/modules/showDetailModelReducer';

import request from '../../utils/request';


export default function TableList({userInfo, staffList, loading, closeStatus}){

    const [currentRecord, setCurrentRecord] = useState({});
    const [dialogStatus, setDialogStatus] = useState(false);
    const dispatch = useDispatch();

    const openDetailDialog = (id) => {
        getStaffById(id);
    }

    const handleSave = data => {
        if(data.type === 'mobile'){
            const checkData = {mobile: data.updateVal};
            // 调用接口判断手机号，是否被占用
            request.post("/staff/checkisexist", {
                ...checkData
            }).then(res => {
                if(res.code === 0){
                    if(res.data !== null){
                        // 手机号已被占用
                        message.error("手机号已被占用，请更换其他手机号！");
                    }else{
                        // 手机号可用
                    }
                }
            }).catch(err => {
                console.log("err======", err);
            })
        }

    };

    const getStaffById = (id) => {
        request.get(`/staff/${id}`).then(res => {
            if(res.code === 0){
                // 把数据存储到状态管理中
                dispatch(setDetailModelData(res.data));
                dispatch(toggleShowDetailModel(true));
            }
        });
    }

    const openReviewRecord = (record) => {
        setDialogStatus(true);
        setCurrentRecord(record);
    }

    return (
        <>
            <Table 
                rowKey="id"
                style={{'width': closeStatus ? 'calc(100% - 30px)' : 'calc(100% - 300px)', 'position': 'absolute', 'left': closeStatus ? '30px' : '300px'}}
                scroll={{x: 'max-content'}}
                components={{
                    body: {
                        row: EditableRow,
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={staffList}
                columns={Columns(handleSave, userInfo, openReviewRecord, openDetailDialog)} 
                pagination={false} 
                loading={loading}
            />
            <Dialog 
                title={currentRecord?.title} 
                dialogStatus={dialogStatus}
                setDialogStatus={setDialogStatus}
                render={() => (<RecordTable {...currentRecord}/>)}
            />
        </>
    )
}