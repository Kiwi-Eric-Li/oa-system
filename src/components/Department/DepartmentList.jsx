import {useState, useEffect} from 'react'
import {Table, Button, Modal} from "antd"

import IconMap from "../IconMap"
import "./department_list.scss"
import AddDepartmentModel from './AddDepartmentModel';

const { Column } = Table;
export default function DepartmentList(){
    const [delId, setDelId] = useState(0);
    const [showDelModal, setShowDelModal] = useState(false);
    const [showChildModal, setShowChildModal] = useState(false);

    useEffect(()=>{
        console.log("=======DepartmentList========")
    }, [])

    const getAllDepartments = () => {
        setShowChildModal(true);
    }

    const delDepartment = () => {
        
    }

    return (
        <>
            <Table 
                dataSource={[]} 
                rowSelection={{type: 'radio', onChange: (id)=>setDelId(id)}}
                pagination={false}
                expandIconColumnIndex={-1}
                rowKey={(record) => record.id}
            >
                <Column title="名称" dataIndex="deptName" />
            </Table>
            {/* 操作按钮 */}
            <div className="operation">
                <Button type="primary" onClick={getAllDepartments} style={{marginRight: '10px'}} icon={IconMap.api}>选择所属部门</Button>
                <Button onClick={() => setShowDelModal(true)} disabled={delId} icon={IconMap.del}>解除所属部门</Button>
            </div>

            {/* 选择所属部门列表 */}
            <AddDepartmentModel 
                showChildModal={showChildModal}
                setShowChildModal={setShowChildModal}
            />

            {/* 解除所属部门 */}
            <Modal 
                title="提示" 
                visible={showDelModal} 
                onOk={delDepartment} 
                onCancel={() => setShowDelModal(false)}>确定要解除所属部门吗？</Modal>
        </>
    )
}