import {Popover} from 'antd'
import "./index.scss";

export default function DropPopover() {
    return (
        <>
            <Popover placeholder="bottomRight" trigger="click" title="搜索" content="">
                <span className='add_icon'>+</span>
            </Popover>
        </>
    );
}