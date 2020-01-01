import Mock from 'mockjs'

Mock.setup({timeout:'200-500'})

// 用户登录
Mock.mock('/login','post',{
    code:1,
    msg: '登录成功',
    data: {
        // 属性 sid 是一个自增数，起始值为 1，每次增 1
        'sid|+1': 1,
        // 属性 userId 是一个5位的随机码
        'userId|5': '',
        // 属性 name 是一个账户
        'account': '@word(6,6)',
        // 属性 name 是一个姓名
        'name': '@cname',
    }
})