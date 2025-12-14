import {useState} from 'react';
import { Button, Row, Input, Form, Col } from 'antd';

import "./index.scss";
import logoImg from '../../imgs/logo.svg';
import IconMap from '../IconMap';
import {loginRule} from '../../utils/loginRule';

export default function Login(){
    const [type, setType] = useState(0);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const submitUserInfo = () => {
        console.log("<<<<<<<<<<<<<");
        console.log("username=", username);
        console.log("password=", password);
    }

    return (
        <div className="login_box">
            <div className="logo">
                <img src={logoImg} alt="logo"/>
                <span>人事管理系统</span>
            </div>
            <Form>
                {
                    !type ? <>
                        <Form.Item name="accountName" rules={loginRule.userRule}>
                            <Input placeholder='请输入用户名' prefix={IconMap.userIcon} value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </Form.Item>
                        <Form.Item name="password" rules={loginRule.passwordRule}>
                            <Input placeholder='请输入密码' type="password" prefix={IconMap.passwordIcon} value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Item>
                    </> : '使用手机号登录'
                }             
                <Row>
                    <Button type="primary" onClick={submitUserInfo}>登录</Button>
                </Row>
                <Row>
                    <Col span={6}>
                        <p className="login-methods-container">忘记密码？</p>
                    </Col>
                    <Col span={18}>
                        <p className='login-methods-container login-methods' onClick={() => setType(!type)}>{!type ? '使用手机号码登录' : '使用帐号密码登录'} {IconMap.arrowRight}</p>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
