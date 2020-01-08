import React, {Component} from 'react';
import { Card, Input, Select, Button, Table, Tag, message } from 'antd';
import { withRouter } from 'react-router-dom';
import windowUtils from "../../utils/windowUtils";
import memoryUtils from "../../utils/memoryUtils";
import LinkButton from "../../components/link-button/link-button";
import { getCoursesList } from "../../api/api";

const { Option } = Select;
const OFFSET_HEIGHT = 160;
const COURSE_CATEGORY = ['产品介绍','模型创作','Scratch'];
class CourseHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            tableDataSource: [],
            tableColumn: this.initTableColumns(),
            cardHeight: windowUtils.getClientHeight()-OFFSET_HEIGHT,
            searchLoading:false,
            courseCategory: 0,
            courseKeywords:'',
            tableLoading: false,
        }
    }
    componentDidMount() {
        const {courseCategory,courseKeywords} = this.state;
        this.getCourses(courseCategory,courseKeywords);
        window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
    }
    getCourses = async(category, keywords)=>{
        this.setState({tableLoading:true});
        const result = await getCoursesList({id:memoryUtils.user.userId,keywords:keywords,category:category });
        if(result.code===global.code.SUCCESS_CODE){
            this.setState({tableDataSource: result.data,tableLoading:false,courseKeywords:'',searchLoading:false});
        }
    }
    handleResize = (e)=>{
        this.setState({cardHeight:e.target.innerHeight-OFFSET_HEIGHT});
    }
    handleChange = (val)=> {
        if(val){
            this.setState({courseCategory:val})
        }else{
            this.setState({courseCategory:0})
        }
    }
    handleCourseStatus = (row, status)=>{
        const baseData = this.state.tableDataSource;
        let index = baseData.findIndex(item=>item.id===row.id);
        if(baseData[index] && baseData[index].id){
            baseData[index].status = status;
            this.setState({tableDataSource:baseData});
        }else{
            message.error('请稍后再试')
        }
    }
    handleSearch = ()=> {
        this.setState({searchLoading:true})
        const {courseCategory, courseKeywords} = this.state;
        this.getCourses(courseCategory, courseKeywords)
    }
    handleSearchChange = (e)=>{
        this.setState({courseKeywords:e.currentTarget.value})
    }
    getCardTitle = ()=> {
        return (
            <div style={{width:'600px',display:'flex',alignItems:'center'}}>
                <Select style={{ width: 150 }} onChange={this.handleChange.bind(this)} placeholder='请选择课程类型' allowClear>
                    <Option value={1}>产品介绍</Option>
                    <Option value={2}>模型创作</Option>
                    <Option value={3}>Scratch</Option>
                </Select>
                <Input placeholder="请输入要查询的内容" style={{marginLeft:'10px',width:'200px'}}
                       value={this.state.courseKeywords} onChange={(e)=>{this.handleSearchChange(e)}}/>
                <Button type='primary' style={{marginLeft:'10px'}} onClick={()=>this.handleSearch()} loading={this.state.searchLoading}>查询</Button>
            </div>
        )
    }
    getCardExtra = ()=> {
        return (
            <Button type='primary' icon="plus">添加课程</Button>
        )
    }
    initTableColumns = ()=>{
        return [
            {
                title: '课程名称',
                dataIndex: 'name',
                key: 'name',
            },{
                title: '课程类别',
                key: 'category',
                width: 300,
                render: (row)=> {
                    return row.category===0 ? <Tag color="blue">{COURSE_CATEGORY[0]}</Tag> : (row.category===1 ? <Tag color="geekblue">{COURSE_CATEGORY[1]}</Tag>:<Tag color="purple">{COURSE_CATEGORY[2]}</Tag>)
                }
            },{
                title: '最新更新时间',
                dataIndex: 'date',
                key: 'date',
                width: 180,
            },{
                title: '排序',
                dataIndex: 'sort',
                key: 'sort',
                width: 100,
            },{
                title: '状态',
                width: 80,
                render: (row)=> {
                    return row.status===0
                        ?
                        <div>
                        <Button type='danger' size='small' onClick={()=>{this.handleCourseStatus(row,1)}}>下架</Button>
                            <label style={{color:'green'}}>在售</label>
                        </div>
                        :
                        <div>
                            <Button type='primary' size='small' onClick={()=>{this.handleCourseStatus(row,0)}}>上架</Button>
                            <label style={{color:'red'  }}>未售</label>
                        </div>
                    }
            },{
                title: '操作',
                key: 'handle',
                width: 80,
                render: (row)=>(
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                        <LinkButton onClick={()=>{this.handleTableDetail(row)}}>详情</LinkButton>
                        <LinkButton onClick={()=>{this.handleTableEdit(row)}}>编辑</LinkButton>
                    </div>
                )
            },
        ];
    }
    handleTableEdit = (row)=>{
        this.props.history.push({pathname:'/courses/edit',state: {data:row,type:'edit'}})
    }
    handleTableDetail = (row)=>{
        this.props.history.push({pathname:'/courses/detail',state: {data:row,type:'detail'}})
    }
    render() {
        const pagination = {
            hideOnSinglePage:true,
            showQuickJumper:true,
            showTotal:(total)=>`共 ${total} 条`
        }
        return (
            <div className='course-home'>
                <Card title={this.getCardTitle()} extra={this.getCardExtra()} className='course-home-card' style={{height:this.state.cardHeight}}>
                    <Table rowKey={record=>record.id} bordered dataSource={this.state.tableDataSource} columns={this.state.tableColumn}
                           loading={this.state.tableLoading} pagination={pagination} scroll={{y:this.state.cardHeight-220}}/>
                </Card>
            </div>
        )
    }
}
export default withRouter(CourseHome);
