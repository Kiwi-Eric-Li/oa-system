import IconMap from "../IconMap";
import "./index.scss"

export default function SearchContainer({closeStatus, setCloseStatus, render}){

    return (
        <div className={`filter_wrapper ${closeStatus ? 'close': ''}`}>
            <div className="filter_title_wrapper">
                <span>字段过滤</span>
                <span className="c_r">{IconMap.reload}</span>
            </div>
            <div className={`filter_form_wrapper ${closeStatus ? 'opacity' : ''}`}>
                {render()}
            </div>
            <div className="close_tip" onClick={() => setCloseStatus(!closeStatus)}>
                {closeStatus ? IconMap.right : IconMap.left}
            </div>
        </div>
    )
}