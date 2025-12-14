import {useState} from 'react'
import { Button, Row, Input, Form, Space } from 'antd';

import "../Login/index.scss"
import IconMap from '../IconMap';
import {loginRule} from '../../utils/loginRule';

export default function ForgetPwd(){

    const [currentStep, setCurrentStep] = useState(1);
    const [mobileNum, setMobileNum] = useState("");
    const [smCode, setSmCode] = useState("");
    const [currentStatus, setCurrentStatus] = useState(true);
    const [disabled, setDisabled] = useState(false);
    let [currentTime, setCurrentTime] = useState(60);

    const [form] = Form.useForm();


    const sendSmCode = () => {
        setCurrentStatus(false);
        setDisabled(true);
        // 调用后端接口获取发送验证码

        // 倒计时
        runTime();
    }

    const runTime = () => {
        const timer = setInterval(() => {
            if(currentTime === 0){
                clearInterval(timer);
                setDisabled(false);
                setCurrentTime(60);
                setCurrentStatus(true);
                return;
            }else{
                setCurrentTime(--currentTime);
            }
        }, 1000);
    }


    const handleNextReset = () => {
        if(currentStep === 1){

            setCurrentStep(2);
        }else{

            // 调用重置密码接口
        }
    }

    return (
        <div className="login_box reset_box">
            <div className="forget_pwd_title">{currentStep === 1 ? '忘记密码' : '重置密码'}</div>
            <Form form={form}>
                {
                    currentStep === 1 ? <>
                        <Form.Item name="mobile" rules={loginRule.mobileRule}>
                            <Input placeholder='请输入您的手机号' prefix={IconMap.mobileIcon} value={mobileNum} onChange={(e) => setMobileNum(e.target.value)}/>
                        </Form.Item>
                        <Form.Item name="code" rules={loginRule.smCodeRule}>
                            <Space.Compact style={{ width: '100%' }}>
                                <Input placeholder='请输入验证码' prefix={IconMap.smCodeIcon} value={smCode} onChange={(e) => setSmCode(e.target.value)} />
                                <Button onClick={sendSmCode} disabled={disabled}>{currentStatus ? '发送验证码' : `${currentTime}秒后重新发送`}</Button>
                            </Space.Compact>
                        </Form.Item>
                    </> : <>
                        <Form.Item name="password" rules={loginRule.passwordRule}>
                            <Input prefix={IconMap.passwordIcon} placeholder='新的登录密码' type="password"/>
                        </Form.Item>
                        <Form.Item name="confirmPassword" rules={loginRule.confirmPasswordRule(form)}>
                            <Input prefix={IconMap.passwordIcon} type="password" placeholder='请再次输入新的登录密码'/>
                        </Form.Item>
                    </>
                }
                <Row>
                    <Button type="primary" onClick={handleNextReset}>
                        {currentStep === 1 ? '下一步' : '重置'}
                    </Button>
                </Row>
            </Form>
        </div>
    )
}