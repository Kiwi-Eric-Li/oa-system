
import {Table} from 'antd'

import {EditableRow, EditableCell} from '../Editable'
import Columns from './Columns';

export default function TableList({userInfo, staffList}){

    const dataSource = [
        {
            key: '0',
            name: 'Edward King 0',
            age: '32',
            address: 'London, Park Lane no. 0',
            auth: '管理员专项'
        },
        {
            key: '1',
            name: 'Edward King 1',
            age: '32',
            address: 'London, Park Lane no. 1',
            auth: '管理员专项'
        }
    ];

    const handleSave = row => {
        console.log(row);
    };


    

    return (
        <Table 
            style={{'flex': 1}}
            scroll={{x: true}}
            components={{
                body: {
                    row: EditableRow,
                    cell: EditableCell,
                },
            }}
            bordered
            dataSource={dataSource}
            columns={Columns(handleSave, userInfo)} 
            pagination={false}
        />
    )
}