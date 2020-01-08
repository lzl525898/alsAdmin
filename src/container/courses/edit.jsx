import React, {Component} from 'react';
import { Card, Icon, List } from 'antd';
import { Redirect } from 'react-router-dom';
import LinkButton from '../../components/link-button/link-button';
import windowUtils from "../../utils/windowUtils";

const OFFSET_HEIGHT = 160;
export default class EditCourse extends Component {
    constructor(props){
        super(props);
        if(this.props.location && this.props.location.state && this.props.location.state.type){
            this.state = {
                cardHeight: windowUtils.getClientHeight()-OFFSET_HEIGHT,
                type: this.props.location.state.type, // detail edit
                data: this.props.location.state.data,
                redirect:false,
            }
        }else{
            this.state = {
                redirect:true,
            }
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
    }
    componentWillUnmount() {

    }

    handleResize = (e)=>{
        this.setState({cardHeight:e.target.innerHeight-OFFSET_HEIGHT});
    }
    handleReturn = ()=>{
        this.props.history.goBack();
    }
    formatListData = ()=>{
        const { name, title, category, aids, software, school, culture, desc, image } = this.state.data;
        const dataArray = [
            {content:name}, // 一级标题
            {content:title}, // 二级标题
            {content:category}, // 类别
            {content:aids}, // 教具
            {content:software}, // 软件
            {content:school}, // 学校
            {content:culture}, // 培养对象
            {content:desc}, // 课程简介
            {content:image}, // 封面
        ]
        return dataArray;
    }
    getCardTitle = ()=>{
        return (
            <LinkButton onClick={()=>this.handleReturn()}>
                <Icon type="arrow-left" /> 返回
            </LinkButton>
        )
    }
    render() {
        const {redirect} = this.state;
        return (
            redirect
            ?
            <Redirect to='/courses'/>
            :
            <div className='course-home'>
                <Card title={this.getCardTitle()} className='course-home-card' style={{height:this.state.cardHeight}}>
                    <List
                        bordered
                        dataSource={this.formatListData()}
                        header={<div style={{fontSize:'16px',fontWeight:'bold'}}>课程详情</div>}
                        footer={<div>Footer</div>}
                        renderItem={item => <List.Item>{item.content}</List.Item>}/>
                </Card>
            </div>
        )
    }
}
