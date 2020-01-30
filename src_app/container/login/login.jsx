import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import logo from '../../assets/images/logo.png';
import './login.less';
import { reqLogin } from '../../api/api';
import { Redirect } from "react-router-dom";
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';


class Login extends Component {
    handleSubmit = (event)=>{
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const {username, password} = values
                const result = await reqLogin(username, password)
                if(result.code===global.code.SUCCESS_CODE){
                    message.success(result.msg);
                    memoryUtils.user = result.data;
                    memoryUtils.menu = memoryUtils.user.menu;
                    storageUtils.saveMenu(memoryUtils.menu);
                    storageUtils.saveUser(result.data);
                    this.props.history.replace("/");
                }else{
                    message.error(result.msg);
                }
            }
        });
    }
    userNameValidator = (rule, value, callback) =>{
        if(!value){
            callback('请输入用户名')
        }else if(value.length<4 || value.length>16){
            callback('请输入4到16位字符')
        }else if(!/^[0-9a-zA-Z_]+$/.test(value)){
            callback('账号必须是英文、数字或下划线组成')
        }
        callback()
    }
    pwdValidator = (rule, value, callback)=>{
        if(!value){
            callback('请输入密码')
        }else if(value.length<4 || value.length>16){
            callback('请输入4到16位字符')
        }else if(!/^[0-9a-zA-Z_]+$/.test(value)){
            callback('密码必须是英文、数字或下划线组成')
        }
        callback()
    }
    render(){
        const user = memoryUtils.user;
        if(user && user.userId){
            return <Redirect to='/'/>
        }
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
                                {getFieldDecorator('username',{rules:[{validator:this.userNameValidator}]})(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password',{rules:[{validator:this.pwdValidator}]})(
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
