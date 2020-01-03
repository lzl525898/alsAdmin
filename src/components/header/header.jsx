import React, {Component} from 'react';
import { Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
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
        setInterval(()=>{
            this.setState({currentTime:formatDate(Date.now())})
        },1000)
        this.getWeather();
    }
    getWeather = async ()=>{
        const {dayPictureUrl, weather} = await reqWeather('哈尔滨');
        this.setState({dayPictureUrl:dayPictureUrl,weather:weather})
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
                    欢迎，{ memoryUtils.user.name } <Button type='link' onClick={this.logout}>退出</Button>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'></div>
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
