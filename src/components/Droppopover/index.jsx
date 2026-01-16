import {useState} from 'react'
import {Popover, Input, List, Pagination} from 'antd'
import "./index.scss";

const {Search} = Input;

export default function DropPopover({placeholderValue, interfaceName, searchType, getSelectItem}) {

    const [total, setTotal] = useState(0);

    const changePage = (page) => {
        console.log("page====", page);
    }

    return (
        <>
            <Popover 
                placeholder="bottomRight" 
                trigger="click" 
                title={<Search placeholder={placeholderValue} />} 
                content={
                    <List footer={<Pagination onChange={changePage} current={1} pageSize={5} total={total} />}>
                        <List.Item>1</List.Item>
                        <List.Item>2</List.Item>
                        <List.Item>3</List.Item>
                    </List>
                }>
                <span className='add_icon'>+</span>
            </Popover>
        </>
    );
}