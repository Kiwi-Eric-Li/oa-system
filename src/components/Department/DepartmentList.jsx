import {useState} from 'react'
import {useSelector} from 'react-redux'
import {Table, Button, Modal, message} from "antd"

import IconMap from "../IconMap"
import "./department_list.scss"
import AddDepartmentModel from './AddDepartmentModel';
import request from '../../utils/request';

const { Column } = Table;

export default function DepartmentList({ value = [], onChange, modalType, modifyDepartment, deptId }) {
    const [delId, setDelId] = useState(null);
    const [showDelModal, setShowDelModal] = useState(false);
    const [showChildModal, setShowChildModal] = useState(false);

    const departmentList = useSelector(state => state.department.data);

    const selectDept = value;

    const getAllDepartments = () => {
        setShowChildModal(true);
    }

    const delDepartment = () => {
        onChange?.([]);        
        setShowDelModal(false);
        unlinkDepartment();
        setDelId(null);
    }

    const unlinkDepartment = () => {
        request.put(`/department/${deptId}`, {
            "type": "parentId",
            "updateVal": null,
            "isDelete": true
        }).then(res => {
            if(res.code === 0){
                message.success("修改成功");
            }
        }).catch(err => {
            console.log("err=============");
        });
    }

    return (
        <>
            <Table 
                dataSource={selectDept}
                rowSelection={{
                    type: 'radio',
                    onChange: (ids) => setDelId(ids[0])
                }}
                pagination={false}
                expandIconColumnIndex={-1}
                rowKey="id"
            >
                <Column title="名称" dataIndex="label" />
            </Table>

            <div className="operation">
                <Button
                    type="primary"
                    onClick={getAllDepartments} 
                    style={{marginRight: '10px'}}
                    icon={IconMap.api}>
                    选择所属部门
                </Button>
                {modalType !== 'add' && 
                    <Button
                        onClick={() => setShowDelModal(true)} disabled={!delId} icon={IconMap.del}>
                        解除所属部门
                    </Button>
                }
            </div>

            <AddDepartmentModel 
                showChildModal={showChildModal}
                setShowChildModal={setShowChildModal}
                departmentList={departmentList}
                setSelectDept={(dept) => {
                    onChange?.(dept);
                    modifyDepartment('parentId', 'parentId');
                }}
            />

            <Modal 
                title="提示" 
                open={showDelModal}
                okText="确定"
                cancelText="取消"
                onOk={delDepartment}
                onCancel={() => setShowDelModal(false)}
            >
                确定要解除所属部门吗？
            </Modal>
        </>
    )
}
