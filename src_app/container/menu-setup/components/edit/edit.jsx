import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Select, Radio, Slider, Form, Input } from 'antd';
import { reqCParentMenu } from "../../../../api/api";
import memoryUtils from "../../../../utils/memoryUtils";
import { formatDate } from "../../../../utils/dateUtils";
const Item = Form.Item;
const ICON_DATA = [{
    category: '线框风格',
    theme:'outlined',
    icons: [{type:'account-book'},{type:'book'},{type:'appstore'},{type:'line-chart'},{type:'radar-chart'}
        ,{type:'contacts'},{type:'container'},{type:'control'},{type:'credit-card'},{type:'crown'},{type:'customer-service'},{type:'dashboard'}
        ,{type:'database'},{type:'bank'},{type:'calculator'},{type:'build'},{type:'calendar'},{type:'carry-out'},{type:'cloud'},{type:'code'}]
},{
    category: '实底风格',
    theme:'filled',
    icons: [{type:'account-book'},{type:'appstore'},{type:'bank'},{type:'book'},{type:'calculator'},{type:'calendar'},{type:'carry-out'}
    ,{type:'codepen-square'},{type:'contacts'},{type:'container'},{type:'control'},{type:'credit-card'},{type:'dashboard'},{type:'database'}
    ,{type:'shop'},{type:'shopping'},{type:'switcher'},{type:'tablet'},{type:'wallet'},{type:'video-camera'},{type:'usb'}]
},{
    category: '双色风格',
    theme: 'twoTone',
    icons: [{type:'account-book'},{type:'appstore'},{type:'bank'},{type:'book'},{type:'calculator'},{type:'calendar'},{type:'carry-out'}
        ,{type:'contacts'},{type:'container'},{type:'control'},{type:'credit-card'},{type:'dashboard'},{type:'database'},{type:'file'}
        ,{type:'schedule'},{type:'gold'},{type:'setting'}, {type:'shop'},{type:'shopping'},{type:'switcher'},{type:'tablet'},{type:'wallet'}]
}]
class EditDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            parentMenuList:[],
            confirmLoading:false
        }
    }
    componentDidMount() {
        if(memoryUtils.user && memoryUtils.user.userId){
            this.userId = memoryUtils.user.userId;
            this.getCParentMenu(this.userId);
        }
    }
    getCParentMenu = async (id) =>{
        const result = await reqCParentMenu(id);
        if(result.code===global.code.SUCCESS_CODE){
            memoryUtils.menuList = result.data;
            this.setState({parentMenuList:result.data})
        }
    }
    handleOk = ()=>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({confirmLoading:true});
                setTimeout(()=>{
                    this.setState({confirmLoading:false});
                    this.props.handleMenuFunc(false, this.genEditMenuObj(values));
                },500)
            }
            this.props.form.resetFields();
        });
    }
    handleCancel = ()=>{
        this.props.form.resetFields();
        this.props.handleMenuFunc(false);
    }
    genEditMenuObj = (values) => {
        const {id,key,parent} = this.props.menuObj;
        const {menuName, menuParent, menuPath, menuParams, menuIcon, menuSort, hidden} = values;
        const obj = {
            icon:menuIcon,
            id:id,
            key:key,
            date: formatDate(Date.now()),
            label:menuName,
            params:menuParams,
            parent:menuParent,
            oldParent:parent,
            path:menuPath + (menuParams ? '?'+menuParams : ''),
            show:hidden*1,
            sort:menuSort*1
        }
        return obj
    }
    getIconNodes = ()=>{
       return (
           <Select placeholder='请选择菜单图标'>
               {
                   (ICON_DATA.length===0)
                   ? null
                   :ICON_DATA.map((itemGroup,indexGroup)=>{
                        return (
                            <Select.OptGroup label={itemGroup.category} key={indexGroup}>
                                {
                                    (itemGroup.icons.length===0)
                                    ? null
                                    : itemGroup.icons.map((item,index)=>{
                                        return (
                                            <Select.Option value={itemGroup.theme + '_' + item.type} key={index}><Icon type={item.type} key={index} theme={itemGroup.theme} /> {item.type}</Select.Option>
                                        )
                                    })
                                }
                            </Select.OptGroup>
                        )
                   })
               }
           </Select>
       )
    }
    render() {
        const { visible, category } = this.props;
        const { getFieldDecorator } = this.props.form;
        const title = category ? '编辑前台菜单' : '编辑后台菜单';
        this.parentNode = this.state.parentMenuList.length===0
            ?
            null
            :
            <Select placeholder='请选择上级菜单'>
                {
                    memoryUtils.menuList.map((item,index)=>{
                        return (
                            <Select.Option value={item.value} key={index}>{item.label}</Select.Option>
                        )
                    })
                }
            </Select>
        ;
        if(this.parentNode){
            const formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 5 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 18 },
                },
            };
            const radioOptions = [
                { label: '显示', value: 1 },
                { label: '隐藏', value: 0 },
            ];
            this.iconSelectNode = this.iconSelectNode ? this.iconSelectNode : this.getIconNodes();
            let path = this.props.menuObj.path ? (this.props.menuObj.path.split('?')[0]) : ''
            return (
                <Modal
                    title={title}
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Form {...formItemLayout}>
                        <Item label='上级菜单'>
                            {getFieldDecorator('menuParent',{
                                initialValue:this.props.menuObj.parent
                            })(this.parentNode)}
                        </Item>
                        <Item label='菜单名称'>
                            {getFieldDecorator('menuName',{
                                initialValue:this.props.menuObj.label,
                                rules:[{ required: true, message: '菜单名称不能为空'}]
                            })(<Input placeholder='请输入菜单名称'/>)}
                        </Item>
                        <Item label='菜单路径'>
                            {getFieldDecorator('menuPath',{
                                initialValue:path,
                                rules:[{ required: true, message: '菜单路径不能为空'}]
                            })(<Input placeholder='请输入菜单路径'/>)}
                        </Item>
                        <Item label='地址参数'>
                            {getFieldDecorator('menuParams',{
                                initialValue:this.props.menuObj.params,rules:[]
                            })(<Input placeholder='例id=3&type=add'/>)}
                        </Item>
                        <Item label='菜单图标'>
                            {getFieldDecorator('menuIcon',{
                                initialValue:this.props.menuObj.icon})(this.iconSelectNode)}
                        </Item>
                        <Item label='菜单排序'>
                            {getFieldDecorator('menuSort',{
                                initialValue:this.props.menuObj.sort})(<Slider
                                marks={{0: '0',20: '20',40: '40',
                                    60: '60',80: '80',100: '100',}}/>)}
                        </Item>
                        <Item label='是否隐藏'>
                            {getFieldDecorator('hidden',{
                                initialValue:this.props.menuObj.show*1})(<Radio.Group options={radioOptions}/>)}
                        </Item>
                    </Form>
                </Modal>
            )
        }else{
            return null
        }
    }
}

EditDialog.propTypes = {
    menuObj: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    category: PropTypes.bool.isRequired,
    handleMenuFunc: PropTypes.func.isRequired,
}

export default Form.create()(EditDialog)
