import React, {Component} from 'react';
import { Card, Icon, List, Input } from 'antd';
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
            {
                name:{label:'课程名称',content:name}, // 一级标题
                title:{label:'二级标题',content:title}, // 二级标题
                category:{label:'类别',content:category}, // 类别
                aids:{label:'教具',content:aids}, // 教具
                software:{label:'软件',content:software}, // 软件
                school:{label:'学校',content:school}, // 学校
                culture:{label:'培养对象',content:culture}, // 培养对象
                desc:{label:'课程简介',content:desc}, // 课程简介
                image:{label:'课程封面',content:image}, // 封面

            }
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
                        renderItem={item =>
                            <List.Item>
                                <div style={{display:'flex',alignItems:'center',width:'440px',borderBottom:'1px solid #999',paddingBottom:'10px'}}>
                                    <div style={{width:'90px',textAlign:'right'}}>{item.name.label}:</div>
                                    <Input style={{flex:1,marginLeft:'20px'}} value={item.name.content} disabled={this.state.type==='detail'}/>
                                </div>
                            </List.Item>}
                    />
                </Card>
            </div>
        )
    }
}
