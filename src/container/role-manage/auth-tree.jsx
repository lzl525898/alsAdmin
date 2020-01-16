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
        this.authTreeData[this.props.uid].checkedKeys = checkedKeys;
        console.log()
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
        const checkedKeys = this.getAuthTreeByUser(this.props.uid).checkedKeys;
        return (
            <Tree
                checkable
                defaultExpandAll={true}
                checkedKeys={checkedKeys}
                onCheck={this.onCheck}
            >
                <TreeNode title="平台权限" key="all">
                    {this.renderTreeNodes(this.state.treeData)}
                </TreeNode>
            </Tree>
        )
    }
}
