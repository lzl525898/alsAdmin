import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav/left-nav';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {  Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import Home from '../home/home';
import RoleManage from '../role-manage/role-manage';
import MenuSetup from '../menu-setup/menu-setup';
import UserManage from '../user-manage/user-manage';
import Courses from '../courses/courses';
import './admin.less';
const { Sider, Content } = Layout;
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        if(!user || !user.userId){
            // render中使用redirect标签跳转
           return <Redirect to='/login'/>
        }
        return(
            <Layout style={{minHeight:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header { user.name }</Header>
                    <Content className='header-content'>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/roleManage' component={RoleManage} />
                            <Route path='/menuSetup' component={MenuSetup} />
                            <Route path='/userManage' component={UserManage} />
                            <Route path='/courses' component={Courses} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer/>
                </Layout>
            </Layout>
        )
    }
}
