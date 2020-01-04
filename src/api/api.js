import jsonp from 'jsonp';
import ajax from './ajax';
import { message } from 'antd';
// 用户登录
export const reqLogin = (username, password)=> ajax('/login',{username,password},'POST');
// 获取前台菜单列表
export const reqCMenuList = (id)=> ajax('/getClientMenuList', {id}, 'POST');
// 获取后台菜单列表
export const reqSMenuList = (id)=> ajax('/getServerMenuList', {id}, 'POST');

// 获取天气
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        jsonp(url,{},(err,data) => {
            if(!err && data.status==='success'){
                const {dayPictureUrl, weather} = data.results[0].weather_data[0];
                resolve({dayPictureUrl, weather});
            }else{
                message.error('获取天气失败');
            }
        })
    })
}
