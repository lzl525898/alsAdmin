import React, {Component} from 'react';
import { Modal, Breadcrumb } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import LinkButton from '../link-button/link-button';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { formatDate } from '../../utils/dateUtils';
import './header.less';
import { reqWeather } from '../../api/api';
const { confirm } = Modal;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: formatDate(Date.now()),
            dayPictureUrl:'',
            weather: ''
        }
    }
    componentDidMount() {
        this.intervalId = setInterval(()=>{
            this.setState({currentTime:formatDate(Date.now())})
        },1000)
        this.getWeather();
    }
    componentWillUnmount() {
        if(this.intervalId && this.intervalId!==''){
            clearInterval(this.intervalId);
        }
    }

    getWeather = async ()=>{
        const {dayPictureUrl, weather} = await reqWeather('哈尔滨');
        this.setState({dayPictureUrl:dayPictureUrl,weather:weather})
    }
    getBreadcrumbNodes = () => {
        this.getBreadcrumbList();
        return (
            <Breadcrumb>
                {
                    (this.breadcrumbArray.length===0)
                    ? null
                    : this.breadcrumbArray.map(item=>{
                        return(
                            item.children ? (
                                <Breadcrumb.Item key={item.key}>
                                    <Link to={item.key}>{item.title}</Link>
                                </Breadcrumb.Item>
                            ) : (
                                <Breadcrumb.Item key={item.key}>
                                    {item.title}
                                </Breadcrumb.Item>
                            )
                        )
                    })
                }
            </Breadcrumb>
        )

    }
    getBreadcrumbList = () =>{
        this.breadcrumbArray = [];
        let targetPathName = '';
        const pathArray = this.props.location.pathname.split('/');
        if(pathArray && pathArray.length>1){
            targetPathName = '/' + pathArray[1];// 当有二级路由的子路由时屏蔽掉
        }else{
            targetPathName = this.props.location.pathname;
        }
        this.getBreadcrumbArray(targetPathName);
        this.breadcrumbArray = this.breadcrumbArray.reverse();
    }
    getBreadcrumbArray = (path) => {
        try{
            const obj = this.getMenuTitle(path==='/' ? '/home' : path);
            this.breadcrumbArray.push(obj);
            if(obj.parent){ // 证明还有父级
                this.getBreadcrumbArray(obj.parent);
            }
        }catch (e) {
            this.breadcrumbArray = []
            const obj = this.getMenuTitle('/home');
            this.breadcrumbArray.push(obj);
        }

    }
    getMenuTitle = (path,menu=memoryUtils.menu) => {
        let result;
        menu.forEach(item => {
            if(item.key===path){
                result=item;
            }else if(item.children){
                // 在所有的子item中查找匹配到
                const obj = item.children.find(cItem=>cItem.key===path);
                // 如果有值才匹配
                if(obj){
                    result = obj;
                }
            }
        });
        return result;
    }
    logout = ()=>{
        const that = this;
        confirm({
            okText:'确定',
            cancelText:'取消',
            content: '确定要退出后台系统吗？',
            onOk() {
                setTimeout(()=>{
                    memoryUtils.clearMemory();
                    storageUtils.clearAllStore();
                    that.props.history.replace('/login');
                },400)
            }
        });
    }
    render() {
        return (
            <div className='header'>
                <div className='header-top'>
                    欢迎，{ memoryUtils.user.name } <LinkButton style={{marginLeft:'6px'}} onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>
                        {this.getBreadcrumbNodes()}
                    </div>
                    <div className='header-bottom-right'>
                        <div>{this.state.currentTime}</div>
                        <img src={this.state.dayPictureUrl} alt=''/>
                        <div>{this.state.weather}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header);
