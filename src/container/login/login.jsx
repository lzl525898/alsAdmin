import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import logo from './images/logo.png';
import './login.less';

class Login extends Component {
    handleSubmit = (event)=>{
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('接受表单信息: ', values);
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <div>奥松<span> 云课堂 </span>AEP后台管理</div>
                </header>
                <section className="login-content">
                    <div className="login-wrapper">
                        <h1>用户登录</h1>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username',{rules:[{required: true, message: '请输入用户名'}]})(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password',{rules:[{required: true, message: '请输入密码'}]})(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登 录</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>
            </div>
        )
    }
}

const WrappedLoginForm = Form.create()(Login);
export default WrappedLoginForm;
