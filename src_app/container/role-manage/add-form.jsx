import React, {Component} from 'react';
import { Form, Input } from 'antd';

class AddForm extends Component {
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
        return (
            <Form {...formItemLayout}>
                <Form.Item label="角色名称">
                    {getFieldDecorator('label', {
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

export default Form.create()(AddForm);
