import React, {Component} from 'react';
import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

class EditForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const currentLabel = this.props.label || '';
        const currentDesc = this.props.desc || '';
        return (
            <Form {...formItemLayout}>
                <Form.Item label="角色名称">
                    {getFieldDecorator('label', {
                        initialValue: currentLabel,
                        rules: [
                            {
                                whitespace: true,
                                message: '请输入角色名称',
                            },
                            {
                                required: true,
                                message: '请输入角色名称',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="描述">
                    {getFieldDecorator('desc', {
                        initialValue: currentDesc,
                        rules: [
                            {
                                whitespace: true,
                                message: '请输入角色描述',
                            },
                            {
                                required: true,
                                message: '请输入角色描述',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>
            </Form>
        )
    }
}

EditForm.propTypes = {
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired
}

export default Form.create()(EditForm);
