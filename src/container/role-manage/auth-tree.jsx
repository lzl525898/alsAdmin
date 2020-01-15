import React, {Component} from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

export default class AuthTree extends Component {
    constructor(props){
        super(props);
        this.authTreeData = this.props.authTree;
        this.state = {
            treeData: [
                {
                    title: '首页',
                    key: '/home',
                },{
                    title: '系统',
                    key: '/system',
                    children: [
                        {
                            title: '菜单设置',
                            key: '/menuSetup',
                        }
                    ]
                },{
                    title: '用户管理',
                    key: '/userManage',
                },{
                    title: '角色管理',
                    key: '/roleManage',
                },{
                    title: '课程',
                    key: '/course',
                    children: [
                        {
                            title: '课程管理',
                            key: '/courses',
                        }
                    ]
                }
            ],
            expandedKeys:[],
            checkedKeys:[],
        };
    }

    getAuthTreeByUser = (id)=>{
        return {
            expandedKeys:this.authTreeData[id].expandedKeys,
            checkedKeys:this.authTreeData[id].checkedKeys
        }
    }

    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    };

    onSelect = (selectedKeys, info) => {
        console.log('onSelect', info);
        this.setState({ selectedKeys });
    };
    renderTreeNodes = data =>{
        return data.reduce((pre,item) => {
            pre.push(<TreeNode title={item.title} key={item.key} >
                {
                    item.children ? this.renderTreeNodes(item.children) : null
                }
            </TreeNode>)
            return pre;
        },[]);
    }
    render() {
        this.authTreeData = this.props.authTree;
        const expandedKeys = this.getAuthTreeByUser(this.props.uid).expandedKeys;
        const checkedKeys = this.getAuthTreeByUser(this.props.uid).checkedKeys;
        console.log("this.props.uid",this.props.uid)
        console.log("expandedKeys",expandedKeys)
        console.log("checkedKeys",checkedKeys)
        return (
            <Tree
                checkable
                expandedKeys={expandedKeys}
                checkedKeys={checkedKeys}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
            >
                <TreeNode title="平台权限" key="all">
                    {this.renderTreeNodes(this.state.treeData)}
                </TreeNode>
            </Tree>
        )
    }
}
