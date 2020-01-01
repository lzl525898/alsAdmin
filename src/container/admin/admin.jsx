import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils';
import { Redirect } from "react-router-dom";
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        if(!user || !user.userId){
            // render中使用redirect标签跳转
           return <Redirect to='/login'/>
        }
        return(
            <div>
                Hello { user.name }
            </div>
        )
    }
}
