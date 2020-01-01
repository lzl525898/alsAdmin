import axios from 'axios';
import { message } from 'antd';
// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.timeout =  10000

//添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 将token给到一个前后台约定好的key中，作为请求发送
    // config.headers['Authorization'] = token
    return config;
}, function (error) {
    return Promise.reject(error);
})

//添加响应拦截器
axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    return Promise.reject(error)
})

export default function ajax(url, data={}, method='GET'){
    return new Promise((resolve,reject)=>{
        let promise
        if(method==='GET'){
            promise = axios.get(url,{params:data})
        }else if(method==='POST'){
            promise = axios.post(url, data)
        }
        promise.then(res=>{
            resolve(res.data)
        }).catch(err=>{
            message.error('ERR:'+err.message)
        })
    })
}