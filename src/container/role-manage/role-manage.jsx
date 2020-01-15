import React, {Component} from 'react';
import { Card, Button, Table, Modal, message } from "antd";
import { getRoleList, addNewRole, editRole } from '../../api/api';
import { formatDate, timeStamp } from '../../utils/dateUtils';
import LinkButton from '../../components/link-button/link-button';
import AddForm from './add-form';
import EditForm from './edit-form';
import AuthTree from './auth-tree';

const { confirm } = Modal;
export default class RoleManage extends Component {
    constructor(props){
        super(props);
        this.authTreeData = [
            { // all
                expandedKeys:['/system','/course'],
                checkedKeys: ['/home','/system','/userManage','/roleManage','/course'],
            },
            { // admin
                expandedKeys:['/system','/course'],
                checkedKeys: ['/home','/system','/userManage','/roleManage','/course'],
            },{ // 机构管理员
                expandedKeys:['/system','/course'],
                checkedKeys: ['/home','/system'],
            },{ // 课程管理员
                expandedKeys:['/system','/course'],
                checkedKeys: ['/home','/course'],
            }
        ];
        this.addForm = React.createRef();
        this.editForm = React.createRef();
        this.authTree = React.createRef();
        this.state = {
            targetRow: {label:'',desc:'',id:0},
            tableData: [],
            authVisible:false,
            addVisible: false,
            editVisible: false,
            selectedRowKeys: [],
            roleManageDisable:true,
        }
    }
    componentDidMount() {
        this.getAllRoleList();
    }
    addNewRoleAuth = ()=>{
        const authObj = {
            expandedKeys:['/system','/course'],
            checkedKeys:[]
        }
        this.authTreeData.push(authObj);
    }
    getAllRoleList = async ()=>{
        const result = await getRoleList();
        if(result.code===global.code.SUCCESS_CODE){
            this.setState({tableData: result.data})
        }
    }
    onSelectChange = (selectedRowKeys )=>{
        const targetObj = this.state.tableData[selectedRowKeys[0]-1];
        // this.authTree.current.setInitData(selectedRowKeys[0], this.authTreeData);
        this.setState({selectedRowKeys: selectedRowKeys, targetRow: targetObj},()=>{
            this.setState({roleManageDisable:false});
        });
    }
    onRowSelect = (record)=>{
        let index = this.state.tableData.findIndex(item=>item.id===record.id) + 1
        let selectRowKeys = [index];
        // this.authTree.current.setInitData(index+1, this.authTreeData);
        this.setState({selectedRowKeys: selectRowKeys, targetRow: record},()=>{
            this.setState({roleManageDisable:false});
        });
    }
    getTableDataSource = ()=>{
        const data = this.state.tableData;
        data.map(item=>{
            item.date = formatDate(timeStamp(item.date))
            return item
        })
        return data;
    }
    onClickEdit = (row)=>{
        this.setState({targetRow: row},()=>{
            this.setState({editVisible:true});
        })
    }
    onClickDelete = (row)=>{
        const that = this;
        confirm({
            title: '删除角色',
            content: '确定要删除当前选中角色吗',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                const baseData = that.state.tableData;
                baseData.splice( baseData.findIndex(item=>item.id===row.id),1);
                that.setState({tableData:baseData},()=>{
                    message.success('删除成功');
                });
            }
        });
    }
    initTableColumns = ()=>{
        return [
            {
                title: '角色名称',
                render: (row) => (
                    <span>
                        {
                            row.id===1
                            ?
                                <span style={{color:'red'}}>{row.label}</span>
                            :
                                <span>{row.label}</span>
                        }
                    </span>
                )
            },
            {
                title: '描述',
                dataIndex: 'desc',
            },
            {
                title: '创建时间',
                dataIndex: 'date',
            },
            {
                title: '操作',
                render: (row) => (
                    <span>
                        <LinkButton onClick={()=>{this.onClickEdit(row)}} disabled={row.id===1}><span style={{color: (row.id===1 ? '#e3e3e3':'#409EFF')}}>编辑</span></LinkButton>
                        <LinkButton onClick={()=>{this.onClickDelete(row)}} disabled={row.id===1}><span style={{color:(row.id===1 ? '#e3e3e3':'red')}}>删除</span></LinkButton>
                    </span>
                )
            }
        ];
    }
    addRoleToData = async (label,desc)=>{
        const result = await addNewRole(label, desc);
        if(result.code===global.code.SUCCESS_CODE){
            const obj = {
                id: this.state.tableData.length + 1,
                label:label,
                desc:desc,
                date: formatDate(Date.now())
            }
            const data = this.state.tableData;
            data.push(obj)
            this.addNewRoleAuth();
            this.setState({tableData:data});
            message.success(result.msg);
        }else{
            message.error('添加失败');
        }
    }
    addHandleOk = ()=>{
        this.addForm.current.validateFields((err,values)=>{
            if (!err) {
                const { label, desc } = values;
                this.addRoleToData( label, desc );
                this.setState({addVisible:false})
                this.addForm.current.resetFields();
            }
        });
    }
    editRoleToData = async (row)=>{
        const result = await editRole();
        if(result.code===global.code.SUCCESS_CODE){
            const baseData = this.state.tableData;
            baseData[baseData.findIndex(item=>item.id===row.id)].label = row.label;
            baseData[baseData.findIndex(item=>item.id===row.id)].desc = row.desc;
            baseData[baseData.findIndex(item=>item.id===row.id)].date = formatDate(Date.now());
            this.setState({editVisible:false, tableData: baseData});
            message.success(result.msg);
        }else{
            message.error('修改失败')
        }
        this.editForm.current.resetFields();
    }
    addHandleCancel = ()=>{
        this.setState({addVisible:false});
        this.addForm.current.resetFields();
    }
    editHandleOk = () =>{
        this.editForm.current.validateFields((err,values)=>{
            if(!err){
                console.log(values, )
                let row ={
                    id: this.editForm.current.props.id,
                    label: values.label,
                    desc: values.desc
                }
                this.editRoleToData(row);
            }
        });
    }
    editHandleCancel = ()=>{
        this.setState({editVisible:false});
    }
    authHandleOk = () => {
        console.log('authHandleOk')
        this.setState({authVisible:false});
    }
    authHandleCancel = () => {
        this.setState({authVisible:false});
    }
    render() {
        const title = (
            <span>
                <Button type='primary' onClick={()=>this.setState({addVisible:true})} icon='plus'>添加新角色</Button>
                <Button style={{marginLeft:'10px'}} type='primary' disabled={this.state.roleManageDisable} onClick={()=>this.setState({authVisible:true})}>设置角色管理权限</Button>
            </span>
        )
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            type: 'radio',
            onChange: this.onSelectChange,
        };
        const pagination = {
            hideOnSinglePage:true,
            showQuickJumper:true,
            showTotal:(total)=>`共 ${total} 条`
        };
        return (
            <div style={{height:'100%'}}>
                <Card className='menu-setup' style={{height:'100%'}} title={title}>
                    <Table rowKey='id' rowSelection={rowSelection} pagination={pagination}
                           columns={this.initTableColumns()} dataSource={this.getTableDataSource()}
                           onRow={(record)=>{
                               return {
                                   onClick: () => {this.onRowSelect(record)}
                               }
                           }}/>
                </Card>
                <Modal
                    title="添加新角色"
                    visible={this.state.addVisible}
                    onOk={this.addHandleOk.bind(this)}
                    onCancel={this.addHandleCancel.bind(this)}
                >
                    <AddForm ref={this.addForm}/>
                </Modal>
                <Modal
                    title="编辑角色"
                    visible={this.state.editVisible}
                    onOk={this.editHandleOk.bind(this)}
                    onCancel={this.editHandleCancel.bind(this)}
                >
                    <EditForm ref={this.editForm} label={this.state.targetRow.label} desc={this.state.targetRow.desc} id={this.state.targetRow.id}/>
                </Modal>
                <Modal
                    title="编辑权限"
                    visible={this.state.authVisible}
                    onOk={this.authHandleOk.bind(this)}
                    onCancel={this.authHandleCancel.bind(this)}
                >
                    <AuthTree ref={this.authTree} uid={this.state.targetRow.id} authTree={this.authTreeData}/>
                </Modal>
            </div>
        )
    }
}
