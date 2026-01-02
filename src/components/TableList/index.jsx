
import {Table} from 'antd'

import {EditableRow, EditableCell} from '../Editable'
import Columns from './Columns';

export default function TableList({userInfo, staffList, loading, closeStatus}){

    const handleSave = row => {
        console.log(row);
    };

    return (
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
            columns={Columns(handleSave, userInfo)} 
            pagination={false} 
            loading={loading}
        />
    )
}