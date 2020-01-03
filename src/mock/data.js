import Mock from 'mockjs'

Mock.setup({timeout:'0-1000'})

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
                },{
                    parent:'/system',
                    title: '菜单设置',
                    key: '/menuSetup',
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
// 获取菜单列表
Mock.mock('/getMenuList', 'post', {
    code:1,
    msg: '获取菜单列表成功',
    data: [
        {
            'id': '450000199707208193',
            'label': '我的课堂',
            'parent': '0',
            'path': '/user',
            'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
            'show':0,
            'sort':1,
        },{
            'id': '120000199506190875',
            'label': '招生中心',
            'parent': '0',
            'path': '/consult',
            'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
            'show':0,
            'sort':2,
            children: [
                {
                    'id': '@id',
                    'label': '咨询管理',
                    'parent': '120000199506190875',
                    'path': '/consult',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'show':0,
                    'sort':1,
                },{
                    'id': '@id',
                    'label': '招生宣传',
                    'parent': '120000199506190875',
                    'path': '/collection',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'show':0,
                    'sort':2,
                }
            ]
        },{
            'id': '990000200505125323',
            'label': '帮助与反馈',
            'parent': '0',
            'path': '/helpfeedback',
            'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
            'show':0,
            'sort':3,
            children: [
                {
                    'id': '@id',
                    'label': '联系我们',
                    'parent': '990000200505125323',
                    'path': '/contactUs',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'show':0,
                    'sort':1,
                },{
                    'id': '@id',
                    'label': '问题反馈',
                    'parent': '990000200505125323',
                    'path': '/feedback',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'show':0,
                    'sort':2,
                }
            ]
        }
    ]
})
