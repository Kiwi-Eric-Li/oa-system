import {useEffect} from 'react';
import {Form, Row, Col, Input, Select, DatePicker, message} from 'antd'
import dayjs from 'dayjs';

import request from '../../utils/request';
import formList from "../../utils/staticList";
import DropPopover from "../Droppopover";
import { formatDate, genderMap, marriageMap } from '../../utils';
import { staffRule } from '../../utils/staffRule';
const {Option} = Select;


export default function DetailForm({detailModelData}){

    const [form] = Form.useForm();
    useEffect(() => {
        if (!detailModelData) return;

        form.setFieldsValue({
            ...detailModelData,
            onboardingTime: detailModelData.onboardingTime ? dayjs(formatDate(detailModelData.onboardingTime)) : null,
            gender: genderMap(detailModelData.gender),
            marriage: marriageMap(detailModelData.marriage),
            dptName: detailModelData.dept?.dptName || '',
        });
    }, [detailModelData]);

    const beforeChecked = async (item) => {
        const newVal = form.getFieldValue(item.itemName);
        const oldVal = detailModelData[item.itemName];
        try{
            if(newVal === oldVal){
                return ;
            }
            // 验证账户名和手机号
            if(item.itemName === 'mobile' || item.itemName === 'accountName'){
                const reqData = await form.validateFields([item.itemName]);
                const {data} = await validateAccountNameAndMobile(reqData);
                if(data !== null){
                    form.setFieldsValue({[item.itemName]: detailModelData[item.itemName]});
                    return message.error("该"+ (item.itemName === 'mobile' ? '手机号' : '账户名') +"已被占用，请更换其他"+ (item.itemName === 'mobile' ? '手机号' : '账户名') +"！");
                }
            }
            
            if(item.itemName === 'dptName'){
                item.itemName = "department";
                _updateStaff("department", form.getFieldValue()?.departmentId);
            }else{
                _updateStaff(item.itemName, newVal);
            }
        }catch(error){
            form.setFieldsValue({[item.itemName]: detailModelData[item.itemName]});
        }
    }

    const _updateStaff = (colName, colVal) => {
        request.put("/staff", {
            "staffId": detailModelData.id,
            "staffData": {
                [colName]: colVal,
            }
        }).then(res => {
            if(res.code === 0){
                if(res.data !== null){
                    message.success("修改成功！");
                }
            }
        })
        
    }

    const validateAccountNameAndMobile = (data) => {
        return request.post("/staff/checkisexist", 
            {...data}
        ).then(res => {
            if(res.code === 0){
                return res;
            }else{
                return Promise.reject(res.msg);
            }
        })
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
            <Input 
                placeholder={item.placeholderVal} 
                readOnly 
                addonAfter={<DropPopover 
                                placeholderValue={item.placeholderVal} 
                                interfaceName={item.interfaceName} 
                                searchType={item.itemName} 
                                getSelectItem={(res)=>{
                                    form.setFieldsValue({
                                        "dptName": res.dptName,
                                        "departmentId": res.id
                                    });
                                    beforeChecked(item);
                                }}/>}/>
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
                                        <Form.Item name={item.itemName} label={item.labelTxt} style={{...item.style}} rules={staffRule[item.itemName]} >
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