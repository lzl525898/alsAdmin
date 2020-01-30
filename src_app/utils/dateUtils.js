export const formatDate = (time)=>{ // 时间戳转时间字符串
    if(!time) return ''
    let date = new Date(time);
    return date.getFullYear() + '-' + ((date.getMonth()+1)>9 ? (date.getMonth()+1) : ('0'+(date.getMonth()+1))) + '-' +
        (date.getDate()>9 ? date.getDate() : ('0'+date.getDate())) + ' ' + (date.getHours()>9 ? date.getHours() : ('0'+date.getHours())) +
        ':' + (date.getMinutes() > 9 ? date.getMinutes() : ('0'+date.getMinutes())) + ':' + (date.getSeconds()>9 ? date.getSeconds() : ('0'+date.getSeconds()));
}
export const timeStamp = (dateString)=>{ // 时间字符串转时间戳
    if(!dateString) return Date.now;
    let date = dateString;
    date = date.replace(/-/g,'/'); //必须把日期'-'转为'/'
    let timestamp = new Date(date).getTime();
    return timestamp;
}
