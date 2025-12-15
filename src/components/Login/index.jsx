import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Button, Row, Input, Form, Col, Space, message } from 'antd';

import "./index.scss";
import logoImg from '../../imgs/logo.svg';
import IconMap from '../IconMap';
import {loginRule} from '../../utils/loginRule';
import request from '../../utils/request';

export default function Login(){
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();
    const [type, setType] = useState(0);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mobileNum, setMobileNum] = useState("");
    const [smCode, setSmCode] = useState("");
    const [currentStatus, setCurrentStatus] = useState(true);
    const [disabled, setDisabled] = useState(false);
    let [currentTime, setCurrentTime] = useState(60);

    // 发送验证码
    const sendSmCode = async () => {
        try {
            if(mobileNum === ""){
                return;
            }
            // 只验证 mobile 字段
            const values = await form.validateFields(['mobile']);
            setCurrentStatus(false);
            setDisabled(true);
            // 倒计时
            runTime();
            // 调用后端接口获取发送验证码
            request.post("/captcha", {
                "mobile": values.mobile
            }).then(res => {
                if(res.code === 0){
                    messageApi.open({
                        type: 'success',
                        content: "验证码发送成功",
                    });
                }
            }).catch(err => {
                messageApi.open({
                    type: 'error',
                    content: err,
                });
            })
        } catch (errorInfo) {
           
        }
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

    const submitUserInfo = async () => {
        try{
            const values = await form.validateFields();
            let dataOptions = {};
            if(type === 0){
                console.log("校验通过===", values);
                console.log("<<<<<<<<<<<<<");
                console.log("username=", username);
                console.log("password=", password);
                dataOptions = {
                    "accountName": username,
                    "loginPwd": password,
                    "type": 1
                }
            }else{
                dataOptions = {
                    "mobile" : mobileNum,
                    "captcha": smCode,
                    "type": 2
                }
            }
            
            request.post("/user/login", dataOptions, { withCredentials: true }).then(res => {
                if(res.code === 0 && res.data != null){
                    messageApi.open({
                        type: 'success',
                        content: '登录成功',
                    });
                    navigate("/oa");
                }else{
                    messageApi.open({
                        type: 'error',
                        content: '用户名或密码错误',
                    });
                }
                
            }).catch(err => {
                messageApi.open({
                    type: 'error',
                    content: err,
                });
            })
        }catch(errorInfo){
            
        }
    }

    const handleForgetPwd = () => {
        navigate("/forgetpwd");
    }


    return (
        <>
            {contextHolder}
            <div className="login_box">
                <div className="logo">
                    <img src={logoImg} alt="logo"/>
                    <span>人事管理系统</span>
                </div>
                <Form form={form}>
                    {
                        !type ? <>
                            <Form.Item name="accountName" rules={loginRule.userRule}>
                                <Input placeholder='请输入用户名' prefix={IconMap.userIcon} value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Item>
                            <Form.Item name="password" rules={loginRule.passwordRule}>
                                <Input placeholder='请输入密码' type="password" prefix={IconMap.passwordIcon} value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Item>
                        </> : <>
                            <Form.Item name="mobile" rules={loginRule.mobileRule}>
                                <Input placeholder='请输入您的手机号' prefix={IconMap.mobileIcon} value={mobileNum} onChange={(e) => setMobileNum(e.target.value)}/>
                            </Form.Item>
                            <Form.Item name="code" rules={loginRule.smCodeRule}>
                                <Space.Compact style={{ width: '100%' }}>
                                    <Input placeholder='请输入验证码' prefix={IconMap.smCodeIcon} value={smCode} onChange={(e) => setSmCode(e.target.value)} />
                                    <Button onClick={sendSmCode} disabled={disabled}>{currentStatus ? '发送验证码' : `${currentTime}秒后重新发送`}</Button>
                                </Space.Compact>
                            </Form.Item>
                        </>
                    }             
                    <Row>
                        <Button type="primary" onClick={submitUserInfo}>登录</Button>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <p className="login-methods-container" onClick={handleForgetPwd}>忘记密码？</p>
                        </Col>
                        <Col span={18}>
                            <p className='login-methods-container login-methods' onClick={() => setType(!type)}>{!type ? '使用手机号码登录' : '使用帐号密码登录'} {IconMap.arrowRight}</p>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    )
}
