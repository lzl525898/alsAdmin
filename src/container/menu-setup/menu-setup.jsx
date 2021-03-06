import React, {Component} from 'react';
import { Card, Table, Button, Icon, Switch, message, Modal } from 'antd';
import { reqCMenuList, reqSMenuList } from '../../api/api';
import memoryUtils from '../../utils/memoryUtils';
import windowUtils from '../../utils/windowUtils';
import EditDialog from './components/edit/edit';
import AddDialog from './components/add/add';
import './menu-setup.less';

const { confirm } = Modal;
const OFFSET_HEIGHT = 160;
export default class MenuSetup extends Component {
    constructor(props){
        super(props);
        this.state = {
            deleteData:{type:'empty'},
            cardHeight: windowUtils.getClientHeight()-OFFSET_HEIGHT,
            tableLoading:false,
            menuCategory:true, // true 前台菜单  false 后台菜单
            menuList: [],
            expandedRowKeys:[],
            editDialogVisible:false,
            addDialogVisible:false,
            targetMenuObj:{},
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this)); //监听窗口大小改变
        this.columns = this.initTableColumns();
        if(memoryUtils.user && memoryUtils.user.userId){
            this.userId = memoryUtils.user.userId;
            this.getCMenuList(this.userId);
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize',function(event){event.preventDefault()},false);
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
    addTargetMenu = (row) =>{
        this.setState({addDialogVisible:true, targetMenuObj:row});
    }
    checkMenusDelete = (data) =>{
        const parentMenuList = [];
        const childMenuList = [];
        if(data && data.length && data.length>0){
            data.forEach(item=>{
                if(item.parent==='0'){
                    parentMenuList.push(item);
                }else{
                    childMenuList.push(item);
                }
            })
        }
        let isDel = true;
        const baseData = this.state.menuList;
        parentMenuList.some(parent=>{
            let parentObj = baseData.find(item=>item.id===parent.id)
            if(!parentObj.children){
                let index = baseData.findIndex(i=>i.id===parentObj.id);
                let memoryMenu = memoryUtils.menuList;
                memoryMenu.splice(memoryMenu.findIndex(obj=>obj.value===baseData[index].id),1);
                memoryUtils.menuList = memoryMenu;
                baseData.splice(index,1);
            }else{
                let childMenu = [];
                parentObj.children.map(child=>childMenu.push(child.id));
                for(let i=0;i<childMenu.length;i++){
                    if( childMenuList.findIndex(index=>index.id===childMenu[i])===-1){
                        isDel = false;
                        message.error('当前菜单下有子菜单，无法操作');
                        return true; // 使用array.some() return true时直接返回，不继续执行
                    }
                }
                // 可以删除当前父级菜单及其下所有子菜单
                let index = baseData.findIndex(i=>i.id===parentObj.id);
                let memoryMenu = memoryUtils.menuList;
                memoryMenu.splice(memoryMenu.findIndex(obj=>obj.value===baseData[index].id),1);
                memoryUtils.menuList = memoryMenu;
                baseData.splice(index,1);
            }
            return 0;
        })
        if(isDel){
            childMenuList.forEach(child=>{
                let parentId = baseData.findIndex(parent=>parent.id===child.parent);
                if(baseData[parentId] && baseData[parentId].children){
                    baseData[parentId].children.splice(baseData[parentId].children.findIndex(item=>item.id===child.id),1);
                }
            })
        }
        this.setState({menuList:baseData,deleteData:{type:'empty'}});
    }
    handleAddMenus = () =>{
        const menuObj = this.state.targetMenuObj;
        this.setState({addDialogVisible:true,targetMenuObj:menuObj})
    }
    handleDelMenus = () =>{
        const that = this;
        if(this.state.deleteData.type==='empty'){
            message.warn('请选择要删除的菜单项');
        } else if(this.state.deleteData.type==='all'){
            confirm({
                title: '删除菜单',
                content: '确定要删除所有菜单吗?',
                onOk() {
                    that.setState({menuList: [],deleteData:{type:'empty'}})
                }
            });
        } else if(this.state.deleteData.type==='select'){
            this.checkMenusDelete(this.state.deleteData.rows)
        }
    }
    delTargetMenu = (row) =>{
        const that = this;
        confirm({
            title: '删除菜单',
            content: `你想删除【${row.label}】这个菜单吗？`,
            onOk() {
                if(row.parent==='0' && row.children && row.children.length>0){
                    message.error('当前菜单下有子菜单，无法操作');
                    return;
                }
                const baseData = that.state.menuList;
                if(row.parent==='0'){// 父级菜单
                    const memoryMenuList = memoryUtils.menuList;
                    memoryMenuList.splice(memoryUtils.menuList.findIndex(menu=>menu.value===row.id),1)
                    memoryUtils.menuList = memoryMenuList;
                    baseData.splice(baseData.findIndex(item=>item.id===row.id),1)
                }else{
                    let parentIndex = baseData.findIndex(item=>item.id===row.parent);
                    if(baseData[parentIndex].children){
                        baseData[parentIndex].children.splice(baseData[parentIndex].children.findIndex(item=>item.id===row.id),1)
                        if(baseData[parentIndex].children.length===0){
                            baseData[parentIndex].children = null
                        }
                    }
                }
                that.setState({menuList:baseData})
            }
        });
    }
    addMenuWithList = (visible, obj)=> {
        if(obj && obj.path){
            const baseData = this.state.menuList;
            if(obj.parent && obj.parent==='0'){ // 添加到一级菜单
                baseData.push(obj);
                memoryUtils.menuList.push({label:obj.label,value:obj.id});
            }else{ // 添加到二级菜单
                //找到一级菜单
                let parentIndex = baseData.findIndex(item=>item.id===obj.parent);
                if(!baseData[parentIndex].children){
                    baseData[parentIndex].children = []
                }
                baseData[parentIndex].children.push(obj);
            }
            this.setState({addDialogVisible:visible,menuList:baseData});
        }else{
            this.setState({addDialogVisible:visible});
        }
    }
    editTargetMenuData = (visible,obj)=> {
        if(obj && obj.path){
            let index;
            const baseData = this.state.menuList;
            const {id,parent,oldParent} = obj;
            if(oldParent==='0'){ // 原来是一级菜单
                index = this.state.menuList.findIndex(item=>item.id===id);
                if(this.state.menuList[index] && this.state.menuList[index].children && this.state.menuList[index].children.length>0){
                    message.error('当前菜单下有子菜单，无法操作');
                    this.setState({editDialogVisible:visible});
                    return
                }
                if(parent==='0'){ // 编辑后为一级菜单
                    baseData[index] = obj;
                }else{ // 编辑后变更为二级菜单
                    // 将数据插入到二级菜单中
                    let parentIndex = this.state.menuList.findIndex(item=>item.id===parent);
                    if(!baseData[parentIndex].children){
                        baseData[parentIndex].children = [];
                    }
                    baseData[parentIndex].children.push(obj);
                    // 删除原数据
                    baseData.splice(index,1)
                }
            }else{ // 原来二级菜单
                let parentIndex = this.state.menuList.findIndex(item=>item.id===oldParent);
                index = this.state.menuList[parentIndex].children.findIndex(item=>item.id===id);
                // 删除原来数据
                baseData[parentIndex].children.splice(index,1)
                if(parent==='0') { // 编辑后为一级菜单
                    // 将数据插入到一级菜单中
                    baseData.push(obj);
                }else{ // 编辑后变更为二级菜单
                   let targetParentIndex = baseData.findIndex(item=>item.id===parent);
                   if(!baseData[targetParentIndex].children){
                       baseData[targetParentIndex].children = []
                   }
                    baseData[targetParentIndex].children.push(obj)

                }
            }
            this.setState({editDialogVisible:visible,menuList:baseData});
        }else{
            this.setState({editDialogVisible:visible});
        }

    }
    initTableColumns = ()=>{
        return [
            {
                title: '菜单名称',
                dataIndex:'label',
                key: 'label',
            },
            {
                title: '路径',
                dataIndex: 'path',
                key: 'path',
            },
            {
                title: '图标',
                width: 80,
                key: 'icon',
                render: (row)=>{
                    return row.icon
                        ?
                        <Icon type={row.icon.split('_')[1]} theme={row.icon.split('_')[0]}/>
                        :
                        null
                }
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
                        <Button type="primary" size='small' ghost style={{marginRight:'8px'}} onClick={()=>{this.addTargetMenu(row)}} disabled={row.parent!=='0'}>添加子菜单</Button>
                        <Button type="primary" size='small' ghost style={{marginRight:'8px'}} onClick={()=>{this.editTargetMenu(row)}}>编辑</Button>
                        <Button type="danger" size='small' ghost onClick={()=>{this.delTargetMenu(row)}}>删除</Button>
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
            <Button type='primary' onClick={this.handleAddMenus}><Icon type='plus'/>添加</Button>
            <Button type='danger' style={{marginLeft:'10px'}} onClick={this.handleDelMenus}><Icon type='delete'/>删除</Button>
        </div>);
        const rowSelection = {
            // onChange: (selectedRowKeys, selectedRows) => {
            //     console.log("onChange",`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            // },
            onSelect: (record, selected, selectedRows) => {
                this.setState({deleteData:{type:'select',rows:selectedRows}})
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                this.setState({deleteData:{type:'all'}})
            },
        }
        const paginationProps = {
            pageSize: 15,
            hideOnSinglePage:true,
            showQuickJumper:true,
            showTotal:(total)=>`共 ${total} 条`
        }
        const tableLoading = this.state.tableLoading ? this.state.tableLoading : false;
        const cardHeight = this.state.cardHeight ? this.state.cardHeight : 0;
        const visible = this.state.editDialogVisible ? this.state.editDialogVisible : false;
        const targetMenuObj = this.state.targetMenuObj ? this.state.targetMenuObj : {parent:''};
        const menuCategory = this.state.menuCategory ? this.state.menuCategory : 0;
        const addDialogVisible = this.state.addDialogVisible ? this.state.addDialogVisible : false;
        const expandedRowKeys = this.state.expandedRowKeys ? this.state.expandedRowKeys : [];
        const menuList = this.state.menuList ? this.state.menuList : [];
        return (
            <div style={{height:cardHeight}}>
                <Card className='menu-setup' style={{height:cardHeight}} title={title} extra={extra}>
                    <Table bordered loading={tableLoading} rowSelection={rowSelection} pagination={paginationProps}
                           expandedRowKeys={expandedRowKeys} dataSource={menuList} columns={this.columns}
                           onExpand={(expanded, record)=>{this.handleExpandedRow(expanded,record)}} scroll={{y:cardHeight-220}}/>
                </Card>
                <EditDialog visible={visible} menuObj={targetMenuObj}
                            handleMenuFunc={this.editTargetMenuData.bind(this)} category={menuCategory}/>
                <AddDialog visible={addDialogVisible} parent={targetMenuObj.parent}
                           handleMenuFunc={this.addMenuWithList.bind(this)} category={menuCategory}/>
            </div>
        )
    }
}
