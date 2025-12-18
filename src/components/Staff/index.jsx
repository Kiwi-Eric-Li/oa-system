import {useState, useEffect} from "react"

import request from '../../utils/request';
import TableHeader from "../TableHeader";

export default function Staff(){
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [staffList, setStaffList] = useState([]);

    useEffect(() => {
        request.get("/staff?page=1&page_size=10").then(res => {
            if(res.code === 0){
                setCount(res.data.count);
                setStaffList(res.data.data);
            }
        }).catch(err => {
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
                interfaceDelMethod={"deleteStaffs"}/>
        </div>
    )
}