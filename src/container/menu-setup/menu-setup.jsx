import React, {Component} from 'react';
import { Card, Table, Button, Icon } from 'antd';
import { reqMenuList } from '../../api/api';
import memoryUtils from '../../utils/memoryUtils';
import './menu-setup.less';

export default class MenuSetup extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuList: []
        }
    }
    UNSAFE_componentWillMount() {
        this.columns = this.initTableColumns();
    }

    componentDidMount() {
        if(memoryUtils.user && memoryUtils.user.userId){
            this.getMenuList(memoryUtils.user.userId);
        }
    }

    getMenuList =async (id) =>{
       const result = await reqMenuList(id);
       if(result.code===global.code.SUCCESS_CODE){
           const menuList = []
           if(result.data && result.data.length && result.data.length>0){
               result.data.map((item,index)=>{
                   return menuList.push(this.genMenuObj(item,index+1))
               })
           }
           this.setState({menuList: menuList})
       }
    }
    genMenuObj = (obj,index)=> {
        const {id, label, parent, path, date, show, sort} = obj;
        const menuObj = {
            parent: parent,
            index:index,
            key:id,
            label: label,
            path: path,
            date: date,
            show: show,
            sort: sort
        }
        return menuObj
    }
    initTableColumns = ()=>{
        return [
            {
                title: '序号',
                width:65,
                dataIndex: 'index',
                key: 'index',
            },
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
                key: 'date',
            },
            {
                title: '是否隐藏',
                dataIndex: 'show',
                key: 'show',
            },
            {
                title: '排序',
                dataIndex: 'sort',
                key: 'sort',
            },
            {
                title: '操作',
                key:'handle',
                width: 240,
                render: () => (
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <Button type="primary" size='small' ghost style={{marginRight:'8px'}}>添加子菜单</Button>
                        <Button type="primary" size='small' ghost style={{marginRight:'8px'}}>编辑</Button>
                        <Button type="danger" size='small' ghost>删除</Button>
                    </div>
                )
            },
        ];
    }
    render() {
        const title = '前台菜单列表';
        const extra = (
            <Button type='primary'><Icon type='plus'/>添加</Button>
        )
        const paginationProps = {
            pageSize: 15,
            hideOnSinglePage:true,
            showQuickJumper:true,
            showTotal:(total)=>`共 ${total} 条`
        }
        return (
            <Card className='menu-setup' title={title} extra={extra}>
                <Table bordered loading={this.state.menuList.length>0 ? false : true} pagination={paginationProps}
                       dataSource={this.state.menuList} columns={this.columns}/>
            </Card>
        )
    }
}
