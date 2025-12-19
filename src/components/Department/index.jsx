import {Button} from "antd"
import {useSelector} from "react-redux"

import IconMap from "../IconMap"
import "./index.scss"
import Tree from "./Tree"


export default function Department(){

    let collapse = useSelector(state => state.collapse.data);

    const openDialog = () => {

    }

    const getDepartmentDetail = (id) => {
        console.log("department_id=", id);
    }

    return (
        <div className="department_container">
            <Button 
                className={`create_department_btn ${collapse ? 'collapse' : ''}`}
                size="small" 
                shape="round"
                icon={IconMap.add} 
                onClick={openDialog}>创建</Button>
            <Tree getDepartmentDetail={getDepartmentDetail}/>
        </div>
    )
}