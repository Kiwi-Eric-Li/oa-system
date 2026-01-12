import {Form, Row, Col, Input, Select, DatePicker} from 'antd'
import formList from "../../utils/staticList";
import DropPopover from "../Droppopover";
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
        ),
        date: item => (
            <DatePicker 
                style={{width: '100%'}} 
                placeholder={item.placeholderVal} 
                onChange={beforeChecked} />   
        ),
        popover: item => (
            <Input placeholder={item.placeholderVal} readOnly addonAfter={<DropPopover />}/>
        ),
        upload: item => <Input placeholder="hello world" />
    }

    return (
        <Form layout='vertical'>
            <Row gutter={24}>
                {
                    formList.map((arr, index) => {
                        return (
                            arr.map((item, childIndex) => {
                                return (
                                    <Col span={12} key={childIndex}>
                                        <Form.Item label={item.labelTxt}>
                                            {formData[item.renderType](item)}
                                        </Form.Item>
                                    </Col>
                                )
                            })
                        )
                    })
                }
            </Row>
        </Form>
    )
}