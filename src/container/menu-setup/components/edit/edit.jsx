import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, Button, Select, Radio, Slider, Form, Input } from 'antd';
const Item = Form.Item;
const ICON_DATA = [{
    category: '线框风格',
    theme:'outlined',
    icons: [{type:'account-book'},{type:'book'},{type:'appstore'},{type:'line-chart'},{type:'radar-chart'}
        ,{type:'contacts'},{type:'container'},{type:'control'},{type:'credit-card'},{type:'crown'},{type:'customer-service'},{type:'dashboard'}
        ,{type:'database'},{type:'experiment'},{type:'file-add'},{type:'file-excel'},{type:'file-exclamation'},{type:'file-image'},{type:'file-markdown'}
        ,{type:'bank'},{type:'calculator'},{type:'build'},{type:'calendar'},{type:'carry-out'},{type:'cloud'},{type:'code'}
        ,{type:'file-pdf'},{type:'file-ppt'},{type:'file-text'},{type:'file-unknown'},{type:'file-word'},{type:'file-zip'},{type:'file'}
        ,{type:'flag'},{type:'folder-add'},{type:'folder'},{type:'folder-open'},{type:'gift'},{type:'hdd'},{type:'home'},{type:'idcard'},{type:'insurance'}
        ,{type:'interaction'},{type:'layout'},{type:'mail'},{type:'medicine-box'},{type:'picture'},{type:'profile'},{type:'project'},{type:'reconciliation'},{type:'schedule'}
        ,{type:'setting'},{type:'shop'},{type:'shopping'},{type:'switcher'},{type:'wallet'},{type:'bars'},{type:'cloud-server'},{type:'exception'},{type:'export'}
        ,{type:'file-done'},{type:'file-jpg'},{type:'file-protect'},{type:'file-sync'},{type:'file-search'},{type:'history'},{type:'import'},{type:'inbox'},{type:'laptop'}
        ,{type:'menu'},{type:'robot'},{type:'solution'},{type:'table'},{type:'team'},{type:'user'},{type:'user-add'},{type:'user-delete'},{type:'usergroup-add'},{type:'usergroup-delete'}]
},{
    category: '实底风格',
    theme:'filled',
    icons: [{type:'account-book'},{type:'appstore'},{type:'bank'},{type:'book'},{type:'calculator'},{type:'calendar'}
        ,{type:'carry-out'},{type:'codepen-square'},{type:'contacts'},{type:'container'},{type:'control'},{type:'credit-card'},{type:'dashboard'}
        ,{type:'database'},{type:'dingtalk-square'},{type:'dribbble-circle'},{type:'dropbox-circle'},{type:'dropbox-square'},{type:'euro-circle'},{type:'file-markdown'}
        ,{type:'file-pdf'},{type:'file-ppt'},{type:'file-text'},{type:'file-word'},{type:'file-zip'},{type:'file'},{type:'folder-open'}
        ,{type:'hdd'},{type:'home'},{type:'idcard'},{type:'layout'},{type:'medicine-box'},{type:'profile'},{type:'project'},{type:'schedule'},
        ,{type:'setting'},{type:'shop'},{type:'shopping'},{type:'switcher'},{type:'tablet'},{type:'wallet'},{type:'video-camera'},{type:'usb'}]
},{
    category: '双色风格',
    theme: 'twoTone',
    icons: [{type:'account-book'},{type:'appstore'},{type:'bank'},{type:'book'},{type:'calculator'},{type:'calendar'},{type:'carry-out'}
        ,{type:'contacts'},{type:'container'},{type:'control'},{type:'credit-card'},{type:'dashboard'},{type:'database'},{type:'file-markdown'}
        ,{type:'file-pdf'},{type:'file-ppt'},{type:'file-text'},{type:'file-zip'},{type:'file'},{type:'folder-open'},{type:'hdd'},{type:'home'}
        ,{type:'idcard'},{type:'layout'},{type:'medicine-box'},{type:'profile'},{type:'project'},{type:'schedule'},{type:'gold'},{type:'setting'},
        {type:'shop'},{type:'shopping'},{type:'switcher'},{type:'tablet'},{type:'wallet'},{type:'video-camera'},{type:'usb'}]
}]
class EditDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            confirmLoading:false
        }
    }
    handleOk = ()=>{
        this.props.handleMenuFunc(false, this.props.menuObj);
    }
    handleCancel = ()=>{
        this.props.handleMenuFunc(false);
    }
    getIconNodes = ()=>{
       return (
           <Select labelInValue placeholder='请选择菜单图标'>
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
                                            <Select.Option value={item.type} key={index}><Icon type={item.type} key={index} theme={itemGroup.theme} /> {item.type}</Select.Option>
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
        const { visible,category } = this.props;
        const { getFieldDecorator } = this.props.form;
        const title = category ? '编辑前台菜单' : '编辑后台菜单';
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
        return (
            <Modal
                title={title}
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
            >
                <Form {...formItemLayout}>
                    <Item label='菜单名称'>
                        {getFieldDecorator('menuName',{
                            rules:[{ required: true, message: '菜单名称不能为空'}]
                        })(<Input placeholder='请输入菜单名称'/>)}
                    </Item>
                    <Item label='菜单路径'>
                        {getFieldDecorator('menuPath',{
                            rules:[{ required: true, message: '菜单路径不能为空'}]
                        })(<Input placeholder='请输入菜单路径'/>)}
                    </Item>
                    <Item label='菜单路径'>
                        {getFieldDecorator('menuParams',{rules:[]})(<Input placeholder='例id=3&type=add'/>)}
                    </Item>
                    <Item label='菜单图标'>
                        {getFieldDecorator('menuIcon',{rules:[]})(this.iconSelectNode)}
                    </Item>
                    <Item label='菜单排序'>
                        {getFieldDecorator('menuSort',{rules:[]})(<Slider
                            marks={{0: '0',20: '20',40: '40',
                            60: '60',80: '80',100: '100',}}/>)}
                    </Item>
                    <Item label='是否隐藏'>
                        {getFieldDecorator('hidden',{rules:[]})(<Radio.Group options={radioOptions}/>)}
                    </Item>
                </Form>
            </Modal>
        )
    }
}

EditDialog.propTypes = {
    menuObj: PropTypes.object.isRequired,
    visible: PropTypes.bool.isRequired,
    category: PropTypes.bool.isRequired,
    handleMenuFunc: PropTypes.func.isRequired,
}

export default Form.create()(EditDialog)
