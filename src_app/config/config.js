global.debug = true;
global.code = {
    // 成功状态码
    SUCCESS_CODE:1,
    /* 执行失败错误码*/
    ERROR_CODE:0,
    /* 参数错误码 */
    // 参数无效
    PAEAM_IS_INVALID:1001,
    // 参数为空
    PARAM_IS_BLANK:1002,
    // 参数类型错误
    PARAM_TYPE_BIND_ERROR:1003,
    // 参数缺失
    PARAM_NOT_COMPLETE:1004,
    /* 用户错误 */
    // 用户未登录，访问路径需要验证
    USER_NOT_LOGGED_IN:2001,
    // 账号不存在或密码错误
    USER_LOGIN_ERROR:2002,
    // 账号已被禁用
    USER_ACCOUNT_FORBIDDEN:2003,
    // 用户不存在
    USER_NOT_EXIST:2004,
    // 用户已存在
    USER_HAS_EXISTED:2005,
}