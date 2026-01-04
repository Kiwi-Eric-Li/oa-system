import { useEffect, useState } from "react"
import {Table} from 'antd'

import request from '../../utils/request';

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
        ]
    }

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        initData();
    }, [])

    const initData = () => {
        request.post("/assessment/all", {
            ...requestData
        }).then(res => {
            if(res.code === 0){
                setTableData(res.data.data);
            }
        }).catch(err => {
            console.log("err=====", err);
        })
    }

    return (
        <div>
            <Table 
                bordered
                dataSource={tableData} 
                columns={columnData[type]}
            />
        </div>
    )
}

