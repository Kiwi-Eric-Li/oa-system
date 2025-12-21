import { Form, Button, Input, Row, Descriptions } from 'antd';

import {departmentRule} from "../../utils/departmentRule"

export default function FormComponent({modalType, setDialogStatus}){

    const [form] = Form.useForm();

    const submitForm = () => {

    }



    return (
        <Form form={form} onFinish={submitForm}>
            <Descriptions column={1} bordered labelStyle={{'width': '150px'}}>
                <Descriptions.Item label="部门名称">
                    <Form.Item name="deptName" rules={departmentRule.deptName}>
                        <Input />
                    </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="备注">
                    <Form.Item name="remark">
                        <Input />
                    </Form.Item>
                </Descriptions.Item>
                <Descriptions.Item label="子部门">

                </Descriptions.Item>
                <Descriptions.Item label="部门负责人">
                    <Form.Item name="deptLeader" rules={departmentRule.deptLeader}>
                        <Input 
                            placeholder='请选择部门负责人' 
                            readOnly 
                            className='border_1' />
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