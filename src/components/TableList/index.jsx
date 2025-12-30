
import {Table} from 'antd'

import {EditableRow, EditableCell} from '../Editable'

export default function TableList(){

    const dataSource = [
        {
            key: '0',
            name: 'Edward King 0',
            age: '32',
            address: 'London, Park Lane no. 0',
        },
        {
            key: '1',
            name: 'Edward King 1',
            age: '32',
            address: 'London, Park Lane no. 1',
        }
    ];

    const handleSave = row => {
        console.log(row);
    };


    const defaultColumns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'age',
            dataIndex: 'age',
        },
        {
            title: 'address',
            dataIndex: 'address',
        }
    ].map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });;

    return (
        <Table 
            style={{'flex': 1}}
            components={{
                body: {
                    row: EditableRow,
                    cell: EditableCell,
                },
            }}
            bordered
            dataSource={dataSource}
            columns={defaultColumns} 
            pagination={false}
        />
    )
}