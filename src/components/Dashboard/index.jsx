import { useState } from "react"

import "./index.scss"
import StaffNum from "./StaffNum"
import OldStaffTable from "./OldStaffTable";


export default function Dashboard(){
    const [amountDataList, setAmountDataList] = useState([
        {"title": "总人数", amount: 17, styleData: {'width': '100%', 'height': '170px'}},
        {"title": "入职1年内员工", amount: 13, styleData: {'width': '33%', 'height': '170px'}},
        {"title": "入职1~2年内员工", amount: 0, styleData: {'width': '33%', 'height': '170px'}},
        {"title": "入职3年以上员工", amount: 4, styleData: {'width': '33%', 'height': '170px'}},
    ]);
    const [staffList, setStaffList] = useState({
        "title": "工龄最老的十个人",
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
    })




    return (
        <div className="dashboard_box">
            {/* 员工展示组件 */}
            {
                amountDataList.map((item, key) => {
                    return <StaffNum key={key} {...item}/>
                })
            }
            {/* 最老的十个员工 */}
            <OldStaffTable {...staffList} />
            
        </div>
    )
}