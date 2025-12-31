
import {Table} from 'antd'

import {EditableRow, EditableCell} from '../Editable'
import Columns from './Columns';

export default function TableList({userInfo, staffList, loading}){

    const handleSave = row => {
        console.log(row);
    };

    return (
        <Table 
            rowKey="id"
            style={{'width': '100%', 'minHeight': '500px'}}
            scroll={{x: true}}
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