



export default function OldStaffTable({title, renderList, styleData}){
    return (
        <div className="staff_num_container" style={{...styleData}}>
            <div className="staff_num_title">{title}</div>
            <div className="staff_num_main">
                <div className="staff_header">
                    <div className="staff_list_title">姓名</div>
                    <div className="staff_list_title">部门</div>
                </div>
                <div className="staff_item_container">
                    {
                        renderList.map((item, index) => {
                            return (
                                <div className="staff_list_item" key={index}>
                                    <span className="item">{item.userName}</span>
                                    <span className="item">{item.department || <span className="danger">未绑定部门</span>}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}