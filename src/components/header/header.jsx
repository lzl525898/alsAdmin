import React, {Component} from 'react';
import { message, Breadcrumb } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import LinkButton from '../link-button/link-button';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { formatDate } from '../../utils/dateUtils';
import './header.less';
import { reqWeather } from '../../api/api';

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
        this.getBreadcrumbArray(this.props.location.pathname);
        this.breadcrumbArray = this.breadcrumbArray.reverse();
    }
    getBreadcrumbArray = (path) => {
        const obj = this.getMenuTitle(path==='/' ? '/home' : path);
        this.breadcrumbArray.push(obj);
        if(obj.parent){ // 证明还有父级
            this.getBreadcrumbArray(obj.parent);
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
        memoryUtils.clearMemory();
        storageUtils.clearAllStore();
        setTimeout(()=>{
            this.props.history.replace('/login');
            message.success('退出成功');
        },200);
    }
    render() {
        return (
            <div className='header'>
                <div className='header-top'>
                    欢迎，{ memoryUtils.user.name } <LinkButton style={{marginLeft:'10px'}} onClick={this.logout}>退出</LinkButton>
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
