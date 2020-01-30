import React, {Component} from 'react';
import { Card, Icon, List, Input, Select, Upload, Slider, Button, message } from 'antd';
import { Redirect } from 'react-router-dom';
import LinkButton from '../../components/link-button/link-button';
import RichTextEditor from '../../components/rich-text-editor/rich-text-editor';
import windowUtils from "../../utils/windowUtils";
import stringUtils from '../../utils/stringUtils';
import {
    updateCourse, // 修改课程内容
} from '../../api/api';

const { Option } = Select;
const { TextArea } = Input;
const OFFSET_HEIGHT = 160;
export default class EditCourse extends Component {
    constructor(props){
        super(props);
        this.rte = React.createRef();
        if(this.props.location && this.props.location.state && this.props.location.state.type){
            this.state = {
                cardHeight: windowUtils.getClientHeight()-OFFSET_HEIGHT,
                type: this.props.location.state.type, // detail edit
                data: this.props.location.state.data,
                listBaseData:this.props.location.state.initBaseData,
                redirect:false,
                imageLoading:false,
                updateLoading:false,
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
    handleResize = (e)=>{
        this.setState({cardHeight:e.target.innerHeight-OFFSET_HEIGHT});
    }
    handleReturn = ()=>{
        this.props.history.goBack();
    }
    formatListData = ()=>{
        const { name, title, category, aids, software, school, culture, desc, image, sort } = this.state.data;
        return {
            name:{label:'课程名称',content:name}, // 一级标题
            title:{label:'二级标题',content:title}, // 二级标题
            category:{label:'类别',content:category}, // 类别
            aids:{label:'教具',content:aids}, // 教具
            software:{label:'软件',content:software}, // 软件
            school:{label:'学校',content:school}, // 学校
            culture:{label:'培养对象',content:culture}, // 培养对象
            desc:{label:'课程简介',content:desc}, // 课程简介
            image:{label:'课程封面',content:image}, // 封面
            sort: {label:'排序',content:sort}, // 排序
        }
    }
    updateCourseData = async ()=>{
        const { name, title, desc } = this.state.data;
        if(stringUtils.isEmpty(name)){
            message.error('请完善课程信息')
            return;
        }
        if(stringUtils.isEmpty(title)){
            message.error('请完善课程信息')
            return;
        }
        if(stringUtils.isEmpty(desc)){
            message.error('请完善课程信息')
            return;
        }
        this.setState({updateLoading:true});
        console.log("richTextEditor",this.rte.current.getDetail())
        const result = await updateCourse();
        if(result.code===global.code.SUCCESS_CODE){
            message.success('课程修改成功');
        }
        this.setState({updateLoading:false});
    }
    getFooterContent =(status)=>{
        if(status){
            return null
        }else{
            return <Button type='primary' style={{marginLeft:'30px'}} onClick={()=>{this.updateCourseData()}} loading={this.state.updateLoading}>修 改</Button>
        }
    }
    getCardTitle = ()=>{
        return (
            <LinkButton onClick={()=>this.handleReturn()}>
                <Icon type="arrow-left" /> <span style={{ marginLeft:'10px',color:'#333' }}>返回</span>
            </LinkButton>
        )
    }
    handleChangeName = (e)=>{
        const baseData = this.state.data;
        baseData.name = e.currentTarget.value;
        this.setState({data:baseData});
    }
    handleChangeTitle = (e)=>{
        const baseData = this.state.data;
        baseData.title = e.currentTarget.value;
        this.setState({data:baseData});
    }
    handleChangeCategory = (val)=>{
        const baseData = this.state.data;
        baseData.category = val;
        this.setState({data:baseData});
    }
    handleChangeAids = (val)=>{
        const baseData = this.state.data;
        baseData.aids = val;
        this.setState({data:baseData});
    }
    handleChangeSoftware = (val)=>{
        const baseData = this.state.data;
        baseData.software = val;
        this.setState({data:baseData});
    }
    handleChangeSchool = (val)=>{
        const baseData = this.state.data;
        baseData.school = val;
        this.setState({data:baseData});
    }
    handleChangeCulture = (val)=>{
        const baseData = this.state.data;
        baseData.culture = val;
        this.setState({data:baseData});
    }
    handleChangeSort = (val)=>{
        const baseData = this.state.data;
        baseData.sort = val;
        this.setState({data:baseData});
    }
    handleChangeDesc = (e)=>{
        const baseData = this.state.data;
        baseData.desc = e.currentTarget.value;
        this.setState({data:baseData});
    }
    beforeUpload = (file)=>{
        console.log(file);
        return true;
    }
    render() {
        const {redirect} = this.state;
        const headerContent = this.state.type==='detail' ? '课程详情' : '编辑课程';
        const footerContent = this.getFooterContent(this.state.type==='detail');
        const data = this.formatListData();
        const uploadButton = (
            <div>
                <Icon type={this.state.imageLoading ? 'loading' : 'plus'} />
                <div>上 传</div>
            </div>
        );
        return (
            redirect
            ?
            <Redirect to='/courses'/>
            :
            <div className='course-home'>
                <Card title={this.getCardTitle()} className='course-home-card' style={{minHeight:this.state.cardHeight}}>
                    <List
                        bordered
                        header={<div style={{fontSize:'16px',fontWeight:'bold'}}>{headerContent}</div>}
                        footer={footerContent}>
                        <List.Item>
                            <div className='course-home-card-list-item'>
                                <div className='course-home-card-list-item-title'>{data.name.label}:</div>
                                <Input style={{flex:1,marginLeft:'20px'}} value={this.state.data.name} disabled={this.state.type==='detail'} onChange={(e)=>this.handleChangeName(e)}/>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='course-home-card-list-item'>
                                <div className='course-home-card-list-item-title'>{data.title.label}:</div>
                                <Input style={{flex:1,marginLeft:'20px'}} value={this.state.data.title} disabled={this.state.type==='detail'} onChange={(e)=>this.handleChangeTitle(e)}/>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='course-home-card-list-item'>
                                <div className='course-home-card-list-item-title'>{data.category.label}:</div>
                                <Select style={{flex:1,marginLeft:'20px'}} value={this.state.data.category} onChange={(val)=>{this.handleChangeCategory(val)}} disabled={this.state.type==='detail'}>
                                    {
                                        this.state.listBaseData.category.length===0
                                        ?
                                        null
                                        :
                                            this.state.listBaseData.category.map(item=>{
                                                return <Option value={item.id} key={item.id}>{item.name}</Option>
                                            })
                                    }
                                </Select>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='course-home-card-list-item'>
                                <div className='course-home-card-list-item-title'>{data.aids.label}:</div>
                                <Select style={{flex:1,marginLeft:'20px'}} value={this.state.data.aids===0 ? '请选择教具' : this.state.data.aids} onChange={(val)=>{this.handleChangeAids(val)}} disabled={this.state.type==='detail'}>
                                    {
                                        this.state.listBaseData.aids.length===0
                                            ?
                                            null
                                            :
                                            this.state.listBaseData.aids.map(item=>{
                                                return <Option value={item.id} key={item.id}>{item.name}</Option>
                                            })
                                    }
                                </Select>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='course-home-card-list-item'>
                                <div className='course-home-card-list-item-title'>{data.software.label}:</div>
                                <Select style={{flex:1,marginLeft:'20px'}} value={this.state.data.software===0 ? '请选择软件' : this.state.data.software} onChange={(val)=>{this.handleChangeSoftware(val)}} disabled={this.state.type==='detail'}>
                                    {
                                        this.state.listBaseData.software.length===0
                                            ?
                                            null
                                            :
                                            this.state.listBaseData.software.map(item=>{
                                                return <Option value={item.id} key={item.id}>{item.name}</Option>
                                            })
                                    }
                                </Select>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='course-home-card-list-item'>
                                <div className='course-home-card-list-item-title'>{data.school.label}:</div>
                                <Select style={{flex:1,marginLeft:'20px'}} value={this.state.data.school===0 ? '请选择学校' : this.state.data.school} onChange={(val)=>{this.handleChangeSchool(val)}} disabled={this.state.type==='detail'}>
                                    {
                                        this.state.listBaseData.school.length===0
                                            ?
                                            null
                                            :
                                            this.state.listBaseData.school.map(item=>{
                                                return <Option value={item.id} key={item.id}>{item.name}</Option>
                                            })
                                    }
                                </Select>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='course-home-card-list-item'>
                                <div className='course-home-card-list-item-title'>{data.culture.label}:</div>
                                <Select style={{flex:1,marginLeft:'20px'}} value={this.state.data.culture===0 ? '请选择培养对象' : this.state.data.culture} onChange={(val)=>{this.handleChangeCulture(val)}} disabled={this.state.type==='detail'}>
                                    {
                                        this.state.listBaseData.culture.length===0
                                            ?
                                            null
                                            :
                                            this.state.listBaseData.culture.map(item=>{
                                                return <Option value={item.id} key={item.id}>{item.name}</Option>
                                            })
                                    }
                                </Select>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='course-home-card-list-item'>
                                <div className='course-home-card-list-item-title'>{data.sort.label}:</div>
                                <Slider style={{flex:1,marginLeft:'20px'}} marks={{0:0,20:20,40:40,60:60,80:80,100:100}} disabled={this.state.type==='detail'}
                                        value={this.state.data.sort} onChange={(val)=>{this.handleChangeSort(val)}}/>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='course-home-card-list-item'>
                                <div className='course-home-card-list-item-title'>{data.desc.label}:</div>
                                <TextArea
                                    style={{flex:1,marginLeft:'20px'}} autoSize={{ minRows: 2, maxRows: 6 }} disabled={this.state.type==='detail'}
                                    value={this.state.data.desc} onChange={(e)=>{this.handleChangeDesc(e)}} placeholder="请输入课程介绍"
                                />
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='course-home-card-list-item' style={{width:'100%'}}>
                                <div className='course-home-card-list-item-title'>课程详情:</div>
                                <RichTextEditor detail={''} ref={this.rte}/>
                            </div>
                        </List.Item>
                        <List.Item>
                            <div className='course-home-card-list-item'>
                                <div className='course-home-card-list-item-title'>{data.image.label}:</div>
                                <div style={{flex:1,marginLeft:'20px'}}>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        showUploadList={false}
                                        disabled={this.state.type==='detail'}
                                        beforeUpload={file=>this.beforeUpload(file)}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
                                        {data.image.content ? <img src={data.image.content} alt="avatar" style={{ width:'100%'}} /> : uploadButton}
                                    </Upload>
                                </div>
                            </div>
                        </List.Item>
                    </List>
                </Card>
            </div>
        )
    }
}
