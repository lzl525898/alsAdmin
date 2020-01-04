import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils';
import LeftNav from '../../components/left-nav/left-nav';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {  Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import Home from '../home/home';
import HomeSetup from '../home-setup/home-setup';
import MenuSetup from '../menu-setup/menu-setup';
import SystemSetup from '../syetem-setup/syetem-setup';
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
            <Layout style={{height:'100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header { user.name }</Header>
                    <Content className='header-content'>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/homeSetup' component={HomeSetup} />
                            <Route path='/menuSetup' component={MenuSetup} />
                            <Route path='/systemSetup' component={SystemSetup} />
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}
