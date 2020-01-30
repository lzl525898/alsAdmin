import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Login from './container/login/login';
import Admin from './container/admin/admin';
import './config/config';
// 模拟数据
import './mock/data';
/*
应用的根组件
 */
export default class App extends Component {
    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <BrowserRouter>
                    <Switch>{/*只匹配其中一个路由*/}
                        <Route path='/login' component={Login}></Route>
                        <Route path='/' component={Admin}></Route>
                    </Switch>
                </BrowserRouter>
            </ConfigProvider>
        )
    }
}
