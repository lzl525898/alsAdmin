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
        // 属性menu 是当前用户的菜单列表
        menu: [
            {
                title: '首页',
                key: '/home',
                icon: 'pie-chart',
            },{
                title: '系统',
                key: '/system',
                icon: 'mail',
                children: [{
                    parent:'/system',
                    title: '首页设置',
                    key: '/homeSetup',
                    icon: 'pie-chart'
                },{
                    parent:'/system',
                    title: '系统设置',
                    key: '/systemSetup',
                    icon: 'pie-chart'
                }],
            },{
                title: '用户',
                key: '/user',
                icon: 'mail',
                children: [{
                    parent:'/user',
                    title: '管理员',
                    key: '/userAdmin',
                    icon: 'pie-chart'
                },{
                    parent:'/user',
                    title: '用户组管理',
                    key: '/userGroup',
                    icon: 'pie-chart',
                    children: [{
                        parent:'/userGroup',
                        title: '身份管理',
                        key: '/roleManage',
                        icon: 'pie-chart'
                    },{
                        parent:'/userGroup',
                        title: '权限管理',
                        key: '/authManage',
                        icon: 'pie-chart'
                    }],
                }],
            }
        ]
    }
})
