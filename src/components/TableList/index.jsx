import { useState } from 'react';
import {Table} from 'antd'

import {EditableRow, EditableCell} from '../Editable'
import Columns from './Columns';
import Dialog from '../Dialog';
import RecordTable from '../RecordTable';


export default function TableList({userInfo, staffList, loading, closeStatus}){

    const [currentRecord, setCurrentRecord] = useState({});
    const [dialogStatus, setDialogStatus] = useState(false);


    const handleSave = row => {
        console.log(row);
    };

    const openReviewRecord = (record) => {
        console.log("record=========", record);
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
                columns={Columns(handleSave, userInfo, openReviewRecord)} 
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