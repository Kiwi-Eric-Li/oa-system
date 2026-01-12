import {Form, Row, Col, Input, Select} from 'antd'
import formList from "../../utils/staticList";
const {Option} = Select;

export default function DetailForm(){

    const beforeChecked = () => {

    }

    const formData = {
        input: item => (
            <Input placeholder={item.itemName === 'password' ? '请在登录界面完成修改' : item.placeholderVal} disabled={item.itemName === 'password'} onBlur={beforeChecked}/>
        ),
        select: item => (
            <Select placeholder={item.placeholderVal} onChange={beforeChecked}>
                {
                    item.optionData.map((val, index) => {
                        return <Option key={index} value={index}>{val}</Option>
                    })
                }
            </Select>
        )
    }

    return (
        <Form layout='vertical'>
            {

            }




            <Row justify={'space-between'}>
                <Col span={11}>hello</Col>
                <Col span={11}>hello 1</Col>
            </Row>
        </Form>
    )
}