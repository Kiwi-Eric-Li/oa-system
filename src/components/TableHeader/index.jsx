import {useSelector} from "react-redux"

import { Button, Pagination } from "antd";
import IconMap from "../IconMap";




export default function TableHeader({currentPage, pageSize, total, changeCurrentPage, interfaceDelMethod}){
    let collapse = useSelector(state => state.collapse.data);
    console.log("<<<<<<<<collapse<<<<<<<<<<", collapse);
    return (
        <div className={!collapse ? 'common_container table_header_container' : 'common_container table_collapse_container'}>
            <div>
                <Button className="mr_10" size="small" shape="round" icon={IconMap.add}>创建</Button>
                <Button danger size="small" shape="round" icon={IconMap.delete}>批量删除</Button>
            </div>
            <div className="pagination_container">
                <Pagination 
                    simple
                    defaultCurrent={currentPage}
                    current={currentPage}
                    pageSize={pageSize}
                    total={total} 
                    onChange={(currentPage) => changeCurrentPage(currentPage)}
                />
                <span>共计{total} 条记录</span>
            </div>
        </div>
    )
}