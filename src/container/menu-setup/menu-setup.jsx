import React, {Component} from 'react';
import { Card, Table, Button, Icon, Switch } from 'antd';
import { reqCMenuList, reqSMenuList } from '../../api/api';
import memoryUtils from '../../utils/memoryUtils';
import windowUtils from '../../utils/windowUtils';
import EditDialog from './components/edit/edit';
import './menu-setup.less';

const OFFSET_HEIGHT = 160;
export default class MenuSetup extends Component {
    constructor(props){
        super(props);

        this.state = {
            cardHeight: windowUtils.getClientHeight()-OFFSET_HEIGHT,
            tableLoading:false,
            menuCategory:true, // true 前台菜单  false 后台菜单
            menuList: [],
            expandedRowKeys:[],
            editDialogVisible:false,
            targetMenuObj:{},
        }
    }
    UNSAFE_componentWillMount() {
        window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
        this.columns = this.initTableColumns();
    }

    componentDidMount() {
        if(memoryUtils.user && memoryUtils.user.userId){
            this.userId = memoryUtils.user.userId;
            this.getCMenuList(this.userId);
        }
    }
    handleResize = (e)=>{
        this.setState({cardHeight:e.target.innerHeight-OFFSET_HEIGHT});
    }

    getCMenuList = async (id) =>{
        this.setState({tableLoading:true})
        const result = await reqCMenuList(id);
        if(result.code===global.code.SUCCESS_CODE){
            const rowKeys = [];
            result.data.map(item=>rowKeys.push(item.key));
            this.setState({menuList: result.data,expandedRowKeys: rowKeys});
        }
        this.setState({tableLoading:false})
    }

    getSMenuList = async (id) => {
        this.setState({tableLoading:true})
        const result = await reqSMenuList(id);
        if(result.code===global.code.SUCCESS_CODE){
            const rowKeys = [];
            result.data.map(item=>rowKeys.push(item.key));
            this.setState({menuList: result.data,expandedRowKeys: rowKeys});
        }
        this.setState({tableLoading:false})
    }

    handleExpandedRow = (status,record) =>{
        const rowKeys = this.state.expandedRowKeys
        if(status){ // 需要展开 加入到 expandedRowKeys
            rowKeys.push(record.key);
        }else{ // 需要关闭 从expandedRowKeys移除
            rowKeys.splice(rowKeys.findIndex(item=>item===record.key),1);
        }
        this.setState({expandedRowKeys:rowKeys})
    }
    handleChangeMenuCategory = (checked)=>{
        this.setState({menuCategory:checked})
        if(checked){
            this.getCMenuList(this.userId);
        }else{
            this.getSMenuList(this.userId);
        }
    }
    editTargetMenu = (row) =>{
        this.setState({editDialogVisible:true, targetMenuObj:row});
    }
    editTargetMenuData = (visible,obj)=> {
        if(obj && obj.path){
            this.setState({editDialogVisible:visible, targetMenuObj:obj});
        }else{
            this.setState({editDialogVisible:visible});
        }

    }
    initTableColumns = ()=>{
        return [
            {
                title: '菜单名称',
                dataIndex: 'label',
                key: 'label',
            },
            {
                title: '路径',
                dataIndex: 'path',
                key: 'path',
            },
            {
                title: '创建时间',
                dataIndex: 'date',
                width: 230,
                key: 'date',
            },
            {
                title: '是否隐藏',
                dataIndex: 'show',
                key: 'show',
                width: 100,
                render:(show) => (
                    <div>
                        { show*1 === 0 ?
                            <span style={{color:'red'}}>否</span>
                            :
                            <span style={{color:'green'}}>是</span>}
                    </div>
                )
            },
            {
                title: '排序',
                dataIndex: 'sort',
                width: 100,
                key: 'sort',
            },
            {
                title: '操作',
                key:'handle',
                width: 240,
                render: (row) => (
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <Button type="primary" size='small' ghost style={{marginRight:'8px'}}>添加子菜单</Button>
                        <Button type="primary" size='small' ghost style={{marginRight:'8px'}} onClick={()=>{this.editTargetMenu(row)}}>编辑</Button>
                        <Button type="danger" size='small' ghost>删除</Button>
                    </div>
                )
            },
        ];
    }
    render() {
        const title = (<div className='menu-setup-title'>
            <label>{this.state.menuCategory ? '前台菜单列表' : '后台菜单列表'}</label>
            <Switch defaultChecked onChange={this.handleChangeMenuCategory}/>
        </div>);
        const extra = (<div>
            <Button type='primary'><Icon type='plus'/>添加</Button>
            <Button type='danger' style={{marginLeft:'10px'}}><Icon type='delete'/>删除</Button>
        </div>);
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
        }
        const paginationProps = {
            pageSize: 15,
            hideOnSinglePage:true,
            showQuickJumper:true,
            showTotal:(total)=>`共 ${total} 条`
        }
        return (
            <div style={{height:this.state.cardHeight}}>
                <Card className='menu-setup' style={{height:this.state.cardHeight}} title={title} extra={extra}>
                    <Table bordered loading={this.state.tableLoading} pagination={paginationProps}
                           expandedRowKeys={this.state.expandedRowKeys} rowSelection={rowSelection}
                           onExpand={(expanded, record)=>{this.handleExpandedRow(expanded,record)}}
                           dataSource={this.state.menuList} columns={this.columns}/>
                </Card>
                <EditDialog visible={this.state.editDialogVisible} menuObj={this.state.targetMenuObj}
                            handleMenuFunc={this.editTargetMenuData.bind(this)} category={this.state.menuCategory}/>
            </div>
        )
    }
}
