import {useState, useEffect} from "react"

import request from '../../utils/request';
import TableHeader from "../TableHeader";
import SearchContainer from "../SearchContainer";
import FilterForm from "../FilterForm";
import TableList from "../TableList";
import "./index.scss"

export default function Staff(){
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [staffList, setStaffList] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let userInfo = localStorage.getItem("userInfo");
        setUserInfo(JSON.parse(userInfo));
        setLoading(true);
        request.get("/staff?page=1&page_size=10").then(res => {
            if(res.code === 0){
                setCount(res.data.count);
                setStaffList(res.data.data);
                setLoading(false);
            }
        }).catch(err => {
            setLoading(false);
            console.log("err======", err);
        })
    }, [])
    
    const handleChangePage = (page) => {
        setPage(page);
    }

    return (
        <div className="main_container">
            <TableHeader 
                currentPage={page} 
                pageSize={10} 
                total={count}
                changeCurrentPage={handleChangePage} 
                interfaceDelMethod={"deleteStaffs"} />
            {/* 左侧搜索区域 */}
            <SearchContainer render={() => <FilterForm />}/>
            {/* 表格数据区域 */}
            <TableList userInfo={userInfo} staffList={staffList} loading={loading}/>
        </div>
    )
}