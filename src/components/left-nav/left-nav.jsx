import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './left-nav.less';
import memoryUtils from '../../utils/memoryUtils';
import logo from '../../assets/images/logo.png';
const { SubMenu } = Menu;
class leftNav extends Component{
    constructor(props){
        super(props);
        this.state = {
            menu: [],
            openKeys: [],
            selectedKeys: []
        };
    }
    componentWillMount() {
        // 得到当前menu列表
        const menu = memoryUtils.menu;
        // 得到当前路由地址
        const routerPath = this.props.location.pathname;
        // 得到当前要选中的地址
        const menuObj = this.getMenuObjByKey(menu,routerPath);
        console.log("menuObj",menuObj);
        this.setState({selectedKeys:[routerPath],menu: menu});
    }
    /*
    根据key获取menu对象
     */
    getMenuObjByKey = (menu,key) =>{
        if(menu.children){
            this.getMenuObjByKey(menu.children, key)
        }
        return menu.find(item=>item.key===key)
    }
    /*
    根据Menu的数据数组生成对应的标签数组
     */
    getMenuNodes = (menuList)=> {
        return menuList.map(item=>{
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    render() {

        return (
            <div>
                <Link className='left-nav' to='/'>
                    <header className='left-nav-header'>
                        <img src={logo} alt=''/>
                        <div><div>奥松云课堂</div><div>AEP后台</div></div>
                    </header>
                </Link>
                <Menu selectedKeys={[this.state.selectedKeys]} mode="inline" theme="dark">
                    { this.getMenuNodes(this.state.menu) }
                </Menu>
            </div>
        )
    }
}
/*
包装非路由组件
新组建传递三个属性 history/location/match
 */
export default withRouter(leftNav)
