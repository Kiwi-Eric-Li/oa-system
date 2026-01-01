import {Tag} from 'antd'

import { getAgeByIdCard, formatDate } from '../../utils';

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
            dataIndex: 'levelInfo',
            render: (data) => data.levelName || '暂无职级描述'
        },
        {
            title: '性别',
            dataIndex: 'gender',
            width: '100px',
            editable: true,
            render: gender => <Tag>{gender === 1 ? '男' : '女'}</Tag>
        },
        {
            title: '部门',
            dataIndex: 'dept',
            render: data => data?.dptName || '--'
        },
        {
            title: '部门负责人',
            dataIndex: 'dept',
            render: data => data.leader?.userName || '--'
        },
        {
            title: '年龄',
            dataIndex: 'idNumber',
            width: '100px',
            editable: true,
            render: data => getAgeByIdCard(data)
        }
    ]

    const authList = [
        {
            title: '入职时间',
            dataIndex: 'onboardingTime',
            width: '200px',
            editable: true,
            render: data => formatDate(data)
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


