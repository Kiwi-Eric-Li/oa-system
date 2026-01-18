import {useState, useEffect} from 'react'
import {Popover, Input, List, Pagination} from 'antd'
import "./index.scss";

import request from '../../utils/request';

const {Search} = Input;

export default function DropPopover({placeholderValue, interfaceName, searchType, getSelectItem}) {

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [list, setList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [searchContent, setSearchContent] = useState("");

    const changePage = (page) => {
        setPage(page);
    }

    const onSearch = (val) => {
        setSearchContent(val);
        setPage(1);
    }
    
    useEffect(() => {
        getListData();
    }, [searchContent, page]);

    const selectItem = (item) => {
        setVisible(false);
        getSelectItem(item);
    }


    const getListData = () => {
        request.post(`/${interfaceName}`, {
            "page": page,
            "page_size": 5,
            "content": searchContent
        }).then(res => {
            if(res.code === 0){
                setList(res.data.list);
                setTotal(res.data.total);
            }
        }).catch(err => {
            console.log("err======", err);
        });
    }

    return (
        <>
            <Popover 
                placeholder="bottomRight" 
                trigger="click" 
                open={visible}
                onOpenChange={(open) => setVisible(open)}
                title={<Search placeholder={placeholderValue} onSearch={onSearch}/>} 
                content={
                    <List 
                        dataSource={list} 
                        renderItem={item => {
                            return <List.Item style={{"cursor": "pointer"}} onClick={(e) => {e.stopPropagation(); selectItem(item);}}>{searchType === 'departmentName' ? item.dptName : item[searchType]}</List.Item>
                        }}
                        footer={
                            <Pagination 
                                onChange={changePage} 
                                current={page} 
                                pageSize={5} 
                                total={total} 
                            />
                        }>
                    </List>
                }>
                <span className='add_icon'>+</span>
            </Popover>
        </>
    );
}