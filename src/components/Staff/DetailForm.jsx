import {useEffect} from 'react';
import {Form, Row, Col, Input, Select, DatePicker} from 'antd'
import dayjs from 'dayjs';

import formList from "../../utils/staticList";
import DropPopover from "../Droppopover";
import { formatDate } from '../../utils';
import { staffRule } from '../../utils/staffRule';
const {Option} = Select;


export default function DetailForm({detailModelData}){

    const [form] = Form.useForm();
    useEffect(() => {
        if (!detailModelData) return;

        form.setFieldsValue({
            ...detailModelData,
            onboardingTime: detailModelData.onboardingTime ? dayjs(formatDate(detailModelData.onboardingTime)) : null,
        });
    }, [detailModelData]);

    const beforeChecked = () => {

    }

    const formData = {
        input: item => (
            <Input placeholder={item.itemName === 'password' ? '请在登录界面完成修改' : item.placeholderVal} disabled={item.itemName === 'password'} onBlur={() => beforeChecked(item)}/>
        ),
        select: item => (
            <Select placeholder={item.placeholderVal} onChange={() => beforeChecked(item)}>
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
                onChange={() => beforeChecked(item)} />   
        ),
        popover: item => (
            <Input placeholder={item.placeholderVal} readOnly addonAfter={<DropPopover />}/>
        ),
        upload: item => <Input placeholder="hello world" />
    }

    return (
        <Form 
            layout='vertical' 
            form={form}>
            <Row gutter={24}>
                {
                    formList.map((arr, index) => {
                        return (
                            arr.map((item, childIndex) => {
                                return (
                                    <Col span={12} key={childIndex}>
                                        <Form.Item name={item.itemName} label={item.labelTxt} style={{...item.style}} >
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