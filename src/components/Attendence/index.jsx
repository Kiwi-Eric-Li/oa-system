import {useState, useEffect} from 'react'

import "./index.scss"
import ViolationChart from './ViolationChart';
import ViolationTable from './ViolationTable';



export default function Attendence(){
    const [userInfo, setUserInfo] = useState({"identity": 1});
    const [chartList, setChartList] = useState([
        {
            "title": "迟到员工数量", 
            "renderList": {
                "xData": [
                    "2025年11月18日",
                    "2025年11月19日",
                    "2025年11月20日",
                    "2025年11月21日",
                    "2025年11月22日",
                    "2025年11月23日",
                    "2025年11月24日",
                    "2025年11月25日",
                    "2025年11月26日",
                    "2025年11月27日",
                    "2025年11月28日",
                    "2025年11月29日"
                ], 
                "yData": [1, 2, 3, 0, 4, 2, 3, 1, 4, 2, 3, 1]
            }
        },
        {
            "title": "早退员工数量",
            "renderList": {
                "xData": [
                    "2025年11月18日",
                    "2025年11月19日",
                    "2025年11月20日",
                    "2025年11月21日",
                    "2025年11月22日",
                    "2025年11月23日",
                    "2025年11月24日",
                    "2025年11月25日",
                    "2025年11月26日",
                    "2025年11月27日",
                    "2025年11月28日",
                    "2025年11月29日"
                ], 
                "yData": [1, 2, 3, 0, 4, 2, 3, 1, 4, 2, 3, 1]
            }
        }
    ]);

    const [tableList, setTableList] = useState([
        {
            "title": "迟到详情",
            "renderList": [
                {
                    "id": 1,
                    "attendanceType": 4,
                    "createTime": "2025-11-28",
                    "staffName": {
                        "department": {
                            "id": 1,
                            "departmentName": "测试部门1"
                        },
                        "userName": "小亮"
                    }
                },
                {
                    "id": 2,
                    "attendanceType": 4,
                    "createTime": "2025-11-29",
                    "staffName": {
                        "department": {
                            "id": 1,
                            "departmentName": "测试部门2"
                        },
                        "userName": "小周"
                    }
                }
            ]
        },
        {
            "title": "早退详情",
            "renderList": [
                {
                    "id": 3,
                    "attendanceType": 3,
                    "createTime": "2025-11-28",
                    "staffName": {
                        "department": {
                            "id": 1,
                            "departmentName": "测试部门3"
                        },
                        "userName": "小亮1"
                    }
                },
                {
                    "id": 4,
                    "attendanceType": 3,
                    "createTime": "2025-11-29",
                    "staffName": {
                        "department": {
                            "id": 1,
                            "departmentName": "测试部门4"
                        },
                        "userName": "小周1"
                    }
                }
            ]
        }
    ])

    useEffect(() => {
        let userInfo = localStorage.getItem("userInfo");
        setUserInfo(JSON.parse(userInfo));
    }, [])


    return (
        <div className="attendance_container">
            {
                userInfo.identity === 1 && <div className="list_container">
                    {
                        chartList.map((item, index) => {
                            return (
                                <ViolationChart key={index} {...item} />
                            )
                        })
                    }
                </div>
            }
            <div className="list_container" style={{'width': userInfo.identity === 1 ? '49.8%' : '100%'}}>
                {
                    tableList.map((item, index) => {
                        return (
                            <ViolationTable key={index} {...item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}