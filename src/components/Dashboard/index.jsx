import { useState } from "react"

import "./index.scss"
import StaffNum from "./StaffNum"
import OldStaffTable from "./OldStaffTable";
import Pie from "./Pie";


export default function Dashboard(){
    const [amountDataList, setAmountDataList] = useState([
        {"title": "总人数", amount: 17, styleData: {'width': '100%', 'height': '170px'}},
        {"title": "入职1年内员工", amount: 13, styleData: {'width': '33%', 'height': '170px'}},
        {"title": "入职1~2年内员工", amount: 0, styleData: {'width': '33%', 'height': '170px'}},
        {"title": "入职3年以上员工", amount: 4, styleData: {'width': '33%', 'height': '170px'}},
    ]);
    const [staffList, setStaffList] = useState({
        "title": "工龄最老的10个人",
        "renderList": [
            {
                "userName": "小坏蛋",
                "department": "研发部"
            },
            {
                "userName": "管理员",
                "department": "大数据部"
            },
            {
                "userName": "马云",
                "department": ""
            },
            {
                "userName": "韩非子",
                "department": "商务部"
            },
            {
                "userName": "张三",
                "department": "技术部"
            },
        ],
        styleData: {'width': '49.8%', 'height': '350px'}
    });
    const [educationList, setEducationList] = useState({
        "title": "学历情况",
        "renderList": [
            {
                "name": "无学历",
                "value": 0
            },
            {
                "name": "中专",
                "value": 1
            },
            {
                "name": "大专",
                "value": 5
            },
            {
                "name": "本科",
                "value": 11
            },
            {
                "name": "研究生",
                "value": 10
            },
            {
                "name": "博士",
                "value": 1
            }
        ],
        styleData: {'width': '49.8%', 'height': '350px'},
        showSidebar: true
    });
    const [genderList, setGenderList] = useState({
        "title": "员工性别占比",
        "renderList": [
            {
                "name": "男",
                "value": 27.27
            },
            {
                "name": "女",
                "value": 72.73
            }
        ],
        styleData: {'width': '49.8%', 'height': '350px'},
        showSidebar: true
    });
    const [averageAge, setAverageAge] = useState({
        "title": "平均年龄",
        "renderList": [
            {
                "name": "男",
                "value": 30.50
            },
            {
                "name": "女",
                "value": 38.56
            }
        ],
        styleData: {'width': '49.8%', 'height': '350px'}
    });
    const [marriageCondition, setMarriageCondition] = useState({
        "title": "员工婚姻状况",
        "renderList": [
            {
                "name": "已婚",
                "value": 50
            },
            {
                "name": "未婚",
                "value": 50
            }
        ],
        styleData: {'width': '49.8%', 'height': '350px'},
        isEmpty: true
    });
    const [ageMap, setAgeMap] = useState({
        "title": "",
        "renderList": [
            {
                "name": "20~29",
                "value": 3
            },
            {
                "name": "30~39",
                "value": 5
            },
            {
                "name": "40~49",
                "value": 2
            },
            {
                "name": "50以上",
                "value": 3
            }
        ]
    })




    return (
        <div className="dashboard_box">
            {/* 员工展示组件 */}
            {
                amountDataList.map((item, key) => {
                    return <StaffNum key={key} {...item}/>
                })
            }
            {/* 学历情况 */}
            <Pie {...educationList} />
            {/* 员工性别占比 */}
            <Pie {...genderList} />
            {/* 员工婚姻状况 */}
            <Pie {...marriageCondition} />

            {/* 最老的十个员工 */}
            <OldStaffTable {...staffList} />
            
        </div>
    )
}