import jsonp from 'jsonp';
import ajax from './ajax';
import { message } from 'antd';
// 用户登录
export const reqLogin = (username, password)=> ajax('/login',{username,password},'POST');
// 获取前台菜单列表
export const reqCMenuList = (id)=> ajax('/getClientMenuList', {id}, 'POST');
// 获取后台菜单列表
export const reqSMenuList = (id)=> ajax('/getServerMenuList', {id}, 'POST');
// 获取前台菜单—父子关系
export const reqCParentMenu = (id)=> ajax('/getClientParentMenu', {id}, 'POST');
// 添加菜单项
export const addMenuItem = (id)=> ajax('/addMenuItem',{id},'POST');
// 获取课程列表
export const getCoursesList = ({id, keywords, category}) => ajax('/getCourseList',{id, keywords, category}, 'POST');  //  data {id, [keywords]:category}
// 获取课程分类
export const getCourseCategory = ()=> ajax('/getCourseCategory',{},'POST');
// 获取课程教具
export const getCourseAids = ()=> ajax('/getCourseAids',{},'POST');
// 获取课程软件
export const getCourseSoftware = ()=> ajax('/getCourseSoftware',{},'POST');
// 获取学校列表
export const getCourseSchool = ()=> ajax('/getCourseSchool',{},'POST');
// 获取课程培养对象
export const getCourseCulture = ()=> ajax('/getCourseCulture',{},'POST');
// 更新课程详情
export const updateCourse = ()=> ajax('/updateCourse', {}, 'POST');
// 添加课程
export const addCourse = ()=> ajax('/addCourse', {}, 'POST');
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
