import {useSelector} from "react-redux"

import { Button, Pagination } from "antd";
import IconMap from "../IconMap";




export default function TableHeader({currentPage, pageSize, total, changeCurrentPage, interfaceDelMethod}){
    const collapse = useSelector(state => state.collapse.data);

    return (
        <div className="table_header_container">
            <div>
                <Button className="mr_10" size="small" shape="round" icon={IconMap.add}>创建</Button>
                <span>{collapse}</span>
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