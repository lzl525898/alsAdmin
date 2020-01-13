import React, {Component} from 'react';
import {Card, Icon, Form, Input, Select, Slider, Upload, Button, message } from "antd";
import { withRouter } from 'react-router-dom';
import LinkButton from "../../components/link-button/link-button";
import { addCourse } from '../../api/api';
import RichTextEditor from '../../components/rich-text-editor/rich-text-editor';

const { TextArea } = Input;
class AddCourse extends Component {
    constructor(props){
        super(props);
        this.rte = React.createRef();
        if(this.props.location && this.props.location.state && this.props.location.state.initBaseData){
            this.state = {
                tmpImage:'',
                imageLoading:false,
                uploadImageStatus:false,
                initBaseData: this.props.location.state.initBaseData,
            }
        }else{
            this.state = {
                tmpImage:'',
                imageLoading:false,
                uploadImageStatus:false,
            }
            this.props.history.replace({pathname:'/courses'});
        }
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
    handleSubmit = (e)=>{
        e.preventDefault();
        console.log("richTextEditor", this.rte.current.getDetail())
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const result = await addCourse();
                if(result.code===global.code.SUCCESS_CODE){
                    message.success(result.msg);
                }
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 10 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 10 },
                sm: { span: 8 },
            },
        };
        const uploadButton = (
            <div >
                <Icon type={this.state.imageLoading ? 'loading' : 'plus'} />
                <div>上 传</div>
            </div>
        );
        return (
            <div className='course-home' style={{minHeight:'100%'}}>
                <Card title={this.getCardTitle()} className='course-home-card'>
                    <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item label="课程名称">
                            {
                                getFieldDecorator('name',{initialValue:'',rules:[{required:true,message:'请输入课程名称'}]})(
                                    <Input placeholder='请输入课程名称'/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="二级标题">
                            {
                                getFieldDecorator('title',{initialValue:'',rules:[{required:true,message:'请输入二级标题'}]})(
                                    <Input placeholder='请输入二级标题'/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="类别">
                            {
                                getFieldDecorator('category',{initialValue:0,rules:[{required:true,message:'请选择类别'}]})(
                                    <Select>
                                        {
                                            this.state.initBaseData.category.length===0
                                                ?
                                                null
                                                :
                                                this.state.initBaseData.category.map(item=>{
                                                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                                })
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="教具">
                            {
                                getFieldDecorator('aids',{rules:[{required:true,message:'请选择教具'}]})(
                                    <Select placeholder='请选择教具'>
                                        {
                                            this.state.initBaseData.aids.length===0
                                                ?
                                                null
                                                :
                                                this.state.initBaseData.aids.map(item=>{
                                                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                                })
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="软件">
                            {
                                getFieldDecorator('software',{rules:[{required:true,message:'请选择软件'}]})(
                                    <Select placeholder='请选择软件'>
                                        {
                                            this.state.initBaseData.software.length===0
                                                ?
                                                null
                                                :
                                                this.state.initBaseData.software.map(item=>{
                                                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                                })
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="学校">
                            {
                                getFieldDecorator('software',{rules:[{required:true,message:'请选择学校'}]})(
                                    <Select placeholder='请选择学校'>
                                        {
                                            this.state.initBaseData.school.length===0
                                                ?
                                                null
                                                :
                                                this.state.initBaseData.school.map(item=>{
                                                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                                })
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="学校">
                            {
                                getFieldDecorator('culture',{rules:[{required:true,message:'请选择培养对象'}]})(
                                    <Select placeholder='请选择培养对象'>
                                        {
                                            this.state.initBaseData.culture.length===0
                                                ?
                                                null
                                                :
                                                this.state.initBaseData.culture.map(item=>{
                                                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                                })
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="排序">
                            {
                                getFieldDecorator('sort',{initialValue:50,rules:[{required:true,message:'请设置排序'}]})(
                                    <Slider marks={{0:0,20:20,40:40,60:60,80:80,100:100}}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="课程介绍">
                            {
                                getFieldDecorator('desc',{rules:[{required:true,message:'请输入课程介绍'}]})(
                                    <TextArea autoSize={{ minRows: 2, maxRows: 6 }} placeholder="请输入课程介绍"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label='课程详情'>
                            <div style={{marginLeft:'-20px'}}>
                                <RichTextEditor detail={''} ref={this.rte}/>
                            </div>
                        </Form.Item>
                        <Form.Item label="课程封面">
                            {
                                getFieldDecorator('image',{valuePropName:'file'})(
                                    <Upload
                                        listType="picture-card"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76">
                                        {this.state.uploadImageStatus ? <img src={this.state.tmpImage} alt="avatar" style={{ width:'100%'}} /> : uploadButton}
                                    </Upload>
                                )
                            }
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 1 }}>
                            <Button type="primary" htmlType="submit">
                                添 加
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default withRouter(Form.create()(AddCourse));
