import { useEffect, useState } from "react"
import {Table, Tag} from 'antd'

import request from '../../utils/request';
import {formatDate, rewardTypeMap} from '../../utils/index';

export default function RecordTable({type, interfaceName, requestData}){

    const columnData = {
        "assessment": [
            {
                "title": "员工姓名",
                "dataIndex": "user",
                "render": data => data.userName
            },
            {
                "title": "考核等级",
                "dataIndex": "result"
            },
            {
                "title": "调整职级",
                "dataIndex": "currentLevelInfo",
                "render": data => data.levelName
            },
            {
                "title": "对应职级分数",
                "dataIndex": "levelScore"
            },
            {
                "title": "考核得分",
                "dataIndex": "assessScore"
            }
        ],
        "reward" : [
            {
                "title": "员工姓名",
                "dataIndex": 'user',
                "render": data => data.userName
            },
            {
                "title": "奖惩类型",
                "dataIndex": 'type',
                "render": data => {
                    return <Tag color={data > 2 ? '#f50' : '#108ee9'}>{rewardTypeMap(data)}</Tag>
                }
            },
            {
                "title": '时间',
                "dataIndex": 'date',
                render: data => formatDate(data)
            },
            {
                "title": "原因",
                "dataIndex": 'reason'
            }
        ],
        "salary": [
            {
                "title": "员工姓名",
                "dataIndex": 'user',
                "render": data => data.userName
            },
            {
                "title": "调整后薪资",
                "dataIndex": 'newSalary'
            },
            {
                "title": "时间",
                "dataIndex": 'startTime',
                "render": data => formatDate(data)
            },
            {
                "title": "调薪原因",
                "dataIndex": 'reason'
            }
        ]
    }

    const [tableData, setTableData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        initData();
    }, [])

    const initData = (page=1, page_size=5) => {
        request.post("/assessment/all", {
            "staff_id": requestData.queryData.staffId,
            "page": page,
            "page_size": page_size
        }).then(res => {
            console.log("res========", res);
            if(res.code === 0){
                setTableData(res.data.data);
                setTotal(res.data.count);
            }
        }).catch(err => {
            console.log("err=====", err);
        })
    }

    const handleChangePage = (page) => {
        initData(page);
    }

    return (
        <div>
            <Table 
                bordered
                dataSource={tableData} 
                columns={columnData[type]} 
                pagination={{defaultPageSize: 5, onChange: handleChangePage, total}}
            />
        </div>
    )
}

