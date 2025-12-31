import {Tag} from 'antd'

export default function Columns(handleSave, userInfo){
    const normalList = [
        {
            title: '姓名',
            dataIndex: 'userName',
            width: '200px',
            editable: true,
        },
        {
            title: '联系电话',
            dataIndex: 'mobile',
            editable: true,
        },
        {
            title: '职级描述',
            dataIndex: 'level',
            // render: (data) => data.levelDescription || '暂无职级描述'
        },
        {
            title: '性别',
            dataIndex: 'gender',
            render: gender => <Tag>{gender === 1 ? '男' : '女'}</Tag>
        },
        {
            title: '部门',
            dataIndex: 'department',
            render: data => data?.department || '--'
        }
    ]

    const authList = [
        {
            title: '权限',
            dataIndex: 'auth'
        }
    ]

    let renderColumnList = userInfo.identity === 0 ? normalList : [...normalList, ...authList];
    renderColumnList = renderColumnList.map(col => {
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
    });
    return renderColumnList;
}


