import React, {Component} from 'react';
import { Button } from 'antd';
import './footer.less';
export default class Footer extends Component {
    handleClick = ()=>{
        window.open("http://www.beian.miit.gov.cn",'_blank')
    }
    render() {
        return (
            <div className='footer'><Button className='type' type='link' onClick={this.handleClick}>奥松智能 | 粤ICP备19107383号-1</Button></div>
        )
    }
}
