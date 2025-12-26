
export default function StaffNum({title, amount, styleData}){
    return (
        <div className="staff_num_container" style={styleData}>
            <div className="staff_num_title">{title}</div>
            <div className="staff_num_content">
                <div className="staff_num_number">{amount}</div>
                <div className="staff_num_txt">人</div>
            </div>
        </div>
    )
}

