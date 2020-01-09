import React, {Component} from 'react';
import {Card, Icon, List} from "antd";
import LinkButton from "../../components/link-button/link-button";
import windowUtils from "../../utils/windowUtils";

const OFFSET_HEIGHT = 160;
export default class AddCourse extends Component {
    constructor(props){
        super(props);
        this.state = {
            cardHeight: windowUtils.getClientHeight()-OFFSET_HEIGHT,
        }
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
    }

    handleResize = (e)=>{
        this.setState({cardHeight:e.target.innerHeight-OFFSET_HEIGHT});
    }
    handleReturn = ()=>{
        this.props.history.goBack();
    }
    getCardTitle = ()=>{
        return (
            <LinkButton onClick={()=>this.handleReturn()}>
                <Icon type="arrow-left" /> <span style={{ marginLeft:'10px',color:'#333' }}>返回</span>
            </LinkButton>
        )
    }
    render() {
        return (
            <div className='course-home'>
                <Card title={this.getCardTitle()} className='course-home-card' style={{height:this.state.cardHeight}}>
                    <List
                        bordered
                        header={<div style={{fontSize:'16px',fontWeight:'bold'}}>添加课程</div>}>
                    </List>
                </Card>
            </div>
        )
    }
}
