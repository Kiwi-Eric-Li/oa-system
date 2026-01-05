import {Tag, Image} from 'antd'

import { getAgeByIdCard, formatDate, genderMap, marriageMap, educationMap, getBirthdayFromIdCard } from '../../utils';
import loadErrorImg from "../../imgs/load_error.png"


export default function Columns(handleSave, userInfo, openReviewRecord){
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
            width: '100px',
            render: (data) => data.levelName || '暂无职级描述'
        },
        {
            title: '性别',
            dataIndex: 'gender',
            width: '100px',
            editable: true,
            render: gender => <Tag>{genderMap(gender)}</Tag>
        },
        {
            title: '部门',
            dataIndex: 'dept',
            render: data => data?.dptName || '--'
        },
        {
            title: '部门负责人',
            dataIndex: 'dept',
            width: '100px',
            render: data => data.leader?.userName || '--'
        },
        
    ]

    const authList = [
        {
            title: '入职时间',
            dataIndex: 'onboardingTime',
            width: '200px',
            editable: true,
            render: data => formatDate(data)
        },
        {
            title: '年龄',
            dataIndex: 'idNumber',
            width: '100px',
            editable: true,
            render: data => getAgeByIdCard(data)
        },
        {
            title: '头像',
            dataIndex: 'avatar',
            render: img => <Image src={img || 'error'} fallback={loadErrorImg}/>
        },
        {
            title: '籍贯',
            dataIndex: 'hometown',
            editable: true,
            render: data => data || '--'
        },
        {
            title: "学历",
            dataIndex: "education",
            render: data => <Tag>{educationMap(data)}</Tag>
        },
        {
            title: "婚姻状况",
            dataIndex: "marriage",
            render: type => <Tag>{marriageMap(type)}</Tag>
        },
        {
            title: '生日',
            dataIndex: "idNumber",
            width: '120px',
            render: data => getBirthdayFromIdCard(data)
        },
        {
            title: '银行卡号',
            dataIndex: 'bankNumber',
            editable: true
        },
        {
            title: '身份证号',
            dataIndex: 'idNumber',
            editable: true
        },
        {
            title: '毕业院校',
            dataIndex: 'graduatedSchool'
        },
        {
            title: "绩效考核",
            dataIndex: 'record',
            render: (record, row) => {
                return <Tag onClick={() => openReviewRecord({
                    "title": "考核记录",
                    "type": "assessment",
                    "interfaceName": "assessment/all",
                    "requestData": {
                        "queryData": {
                            "staffId": row.id
                        }
                    }
                })}>查看</Tag>
            }
        },
        {
            title: "奖惩记录",
            dataIndex: 'record',
            render: (record, row) => {
                return <Tag onClick={() => openReviewRecord({
                    "title": "奖惩记录",
                    "type": "reward",
                    "interfaceName": "rewardandpunish/all",
                    "requestData": {
                        "queryData": {
                            "staffId": row.id
                        }
                    }
                })}>查看</Tag>
            }
        },
        {
            title: "调薪记录",
            dataIndex: 'record',
            render: (record, row) => {
                return <Tag>查看</Tag>
            }
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


