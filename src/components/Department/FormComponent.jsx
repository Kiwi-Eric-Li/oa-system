import { Form, Button, Input, Row, Descriptions, Select, message } from 'antd';
import { useEffect, useState } from 'react';

import {departmentRule} from "../../utils/departmentRule"
import DepartmentList from './DepartmentList';
import request from '../../utils/request';



export default function FormComponent({modalType, setDialogStatus, getAllDepartments, deptId}){
    const [deptLeader, setDeptLeader] = useState([]);
    const [form] = Form.useForm();

    const submitForm = (values) => {
        request.post("/department", {
            "dptName": values.deptName,
            "parentId": values.parentId.length ? values.parentId[0].id : null,
            "remark": values.remark,
            "deptLeader": values.deptLeader
        }).then(res => {
            if(res.code === 0){
                message.success("部门添加成功");
                setDialogStatus(false);
                getAllDepartments();
            }
        }).catch(err => {
            console.log("======err=====", err);
        })
    }

    const onChange = value => {
        
    };
    const onSearch = value => {
        console.log('search:', value);
    };

    const getStaffList = () => {
        request.get("/staff?page=1&page_size=100000000").then(res => {
            if(res.code === 0){
                let result = [];
                res.data.data.forEach(item => {
                    let obj = {
                        value: item.id,
                        label: item.userName
                    }
                    result.push(obj);
                });
                setDeptLeader(result);
            }
        }).catch(err => {
            console.log("err======", err);
        })
    }

    const getDepartmentDetail = (id) => {
        request.get(`/department/${id}`).then(res => {
            if(res.code === 0){
                let obj = {};
                obj['deptName'] = res.data.dptName;
                obj['remark'] = res.data.remark;
                obj['deptLeader'] = res.data.deptLeader;
                if(res.data.parentDept != null){
                    obj['parentId'] = [{
                        'id': res.data.parentDept.id,
                        'label': res.data.parentDept.dptName
                    }]
                }else{
                    obj['parentId'] = []
                }
                form.setFieldsValue(obj);
            }
        }).catch(err=>{
            console.log("err=========", err);
        })
    }

    useEffect(()=>{
        getStaffList();
        if(modalType === 'update'){
            getDepartmentDetail(deptId);
        }
    }, [])

    const updateDepartment = (key) => {
        if(key === 'deptName'){
            modifyDepartment(key, 'dptName');
        }else if(key === 'remark'){
            modifyDepartment(key, key);
        }
        
        
    }

    const modifyDepartment = (keyName, type) => {
        request.put(`/department/${deptId}`, {
            "type": type,
            "updateVal": form.getFieldValue(keyName),
            "isDelete": false
        }).then(res => {
            if(res.code === 0){
                message.success("修改成功");
            }
            console.log("res===========", res);
        });
    }

    return (
        <Form 
            form={form} 
            onFinish={submitForm}>
            <Descriptions column={1} bordered styles={{
                label: {
                width: 150
            }}}>
                <Descriptions.Item label="部门名称">
                    <Form.Item name="deptName" rules={departmentRule.deptName}>
                        <Input onBlur={() => {modalType === 'update' && updateDepartment('deptName')}}/>
                    </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="备注">
                    <Form.Item name="remark">
                        <Input onBlur={() => {modalType === 'update' && updateDepartment('remark')}}/>
                    </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="所属部门" >
                    <Form.Item name="parentId">
                        <DepartmentList modalType={modalType} />
                    </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="部门负责人">
                    <Form.Item name="deptLeader" rules={departmentRule.deptLeader}>
                        <Select
                            showSearch={{ optionFilterProp: 'label', onSearch }}
                            placeholder="请输入查找的员工姓名"
                            onChange={(value) => {modalType === 'update' && onChange(value)}}
                            options={deptLeader}
                        />
                    </Form.Item>
                </Descriptions.Item>
            </Descriptions>
            {
                modalType === "add" && (
                    <Form.Item>
                        <Row justify="end">
                            <Button className="mt_20" type="primary" htmlType='submit'>创建</Button>
                        </Row>
                    </Form.Item>
                )
            }
        </Form>
    )
}