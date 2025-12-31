import {Tag} from 'antd'

import { formatDate } from '../../utils';

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
            editable: true,
            render: gender => <Tag>{gender === 1 ? '男' : '女'}</Tag>
        },
        {
            title: '部门',
            dataIndex: 'department',
            render: data => data?.department || '--'
        },
        {
            title: '部门负责人',
            dataIndex: ''
        },
        {
            title: '年龄',
            dataIndex: 'idNumber',
            width: '200px',
            editable: true
        }
    ]

    const authList = [
        {
            title: '入职时间',
            dataIndex: 'onboardingTime',
            width: '200px',
            editable: true,
            render: data => formatDate(data, 'YYYY-MM-DD')
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


