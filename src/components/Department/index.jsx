import {Button} from "antd"
import {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import { message } from 'antd';

import IconMap from "../IconMap"
import "./index.scss"
import Tree from "./Tree"
import request from '../../utils/request';


export default function Department(){
    const [treeData, setTreeData] = useState([]);

    let collapse = useSelector(state => state.collapse.data);

    useEffect(() => {
        request("/department").then(res => {
            if(res.code === 0){
                setTreeData(res.data);
            }
        }).catch(err => {
            message.error(err);
        })
    }, []);



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
            <Tree getDepartmentDetail={getDepartmentDetail} treeData={treeData}/>
        </div>
    )
}