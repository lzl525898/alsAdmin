import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './left-nav.less';
import memoryUtils from '../../utils/memoryUtils';
import logo from '../../assets/images/logo.png';
const { SubMenu } = Menu;
class leftNav extends Component{
    UNSAFE_componentWillMount() {
        // 得到当前路由地址
        const routerPath = this.props.location.pathname;
        this.selectedKey = routerPath;
        // 获取菜单节点
        this.menuNodes = this.getMenuNodes(memoryUtils.menu, routerPath);
    }
    /*
    根据Menu的数据数组生成对应的标签数组
     */
    getMenuNodes = (menuList, key)=> {
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
                let targetKey = '';
                const keyArray = key.split('/');
                if(keyArray && keyArray.length>1){ // 当有二级路由的子路由时屏蔽掉
                    targetKey = '/'+keyArray[1];
                }else{
                    targetKey = key;
                }
                const cItem = item.children.find(cItem=>cItem.key===targetKey)
                if(cItem){ // 存在说明当前item的字列表需要转开
                    this.openKey = item.key;
                }
                return (
                    <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                        {this.getMenuNodes(item.children, key)}
                    </SubMenu>
                )
            }
        })
    }

    render() {
        const pathArray = this.props.location.pathname.split('/');
        if(pathArray && pathArray.length>1){
            this.selectedKey = pathArray[1];
        }else{
            this.selectedKey = this.props.location.pathname;
        }
        return (
            <div>
                <Link className='left-nav' to='/'>
                    <header className='left-nav-header'>
                        <img src={logo} alt=''/>
                        <div><div>奥松云课堂</div><div>AEP后台</div></div>
                    </header>
                </Link>
                <Menu selectedKeys={[this.selectedKey]} defaultOpenKeys={[this.openKey]} mode="inline" theme="dark">
                    { this.menuNodes }
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
