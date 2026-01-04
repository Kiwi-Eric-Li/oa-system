import { useEffect } from "react"

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



    useEffect(() => {
        initData();
    }, [])

    const initData = () => {
        request.post("/assessment/all", {
            ...requestData
        }).then(res => {
            console.log("res====/assessment/all=====", res);
        })
    }

    return (
        <div>record table</div>
    )
}

