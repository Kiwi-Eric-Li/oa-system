import {Button} from "antd"
import {useSelector} from "react-redux"

import IconMap from "../IconMap"
import "./index.scss"


export default function Department(){

    let collapse = useSelector(state => state.collapse.data);

    const openDialog = () => {

    }


    return (
        <div className="department_container">
            <Button 
                className={`create_department_btn ${collapse ? 'collapse' : ''}`}
                size="small" 
                shape="round"
                icon={IconMap.add} 
                onClick={openDialog}>创建</Button>
        </div>
    )
}