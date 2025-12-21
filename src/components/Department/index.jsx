import {Button} from "antd"
import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import { message } from 'antd';

import IconMap from "../IconMap"
import "./index.scss"
import Tree from "./Tree"
import request from '../../utils/request';
import Dialog from "./Dialog";
import FormComponent from "./FormComponent";
import {setDepartment} from "../../store/modules/departmentReducer"


export default function Department(){
    const [treeData, setTreeData] = useState([]);
    const [modalTitle, setModalTitle] = useState("创建部门");
    const [dialogStatus, setDialogStatus] = useState(false);
    const [modalType, setModalType] = useState("add");
    const dispatch = useDispatch();

    let collapse = useSelector(state => state.collapse.data);

    useEffect(() => {
        request("/department").then(res => {
            if(res.code === 0){
                setTreeData(res.data);
                // 存储到store中
                dispatch(setDepartment(res.data));
            }
        }).catch(err => {
            message.error(err);
        })
    }, []);

    const openDialog = () => {
        setModalTitle("创建部门");
        setDialogStatus(true);
        setModalType("add");
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
            {/* 新增部门和部门详情对话框 */}
            <Dialog 
                title={modalTitle}
                dialogStatus={dialogStatus}
                setDialogStatus={setDialogStatus}
                width={800}
                className="department_detail_modal"
                render={() => (
                    <FormComponent modalType={modalType} setDialogStatus={setDialogStatus}/>
                )}
            />
        </div>
    )
}