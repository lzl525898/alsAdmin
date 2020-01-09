import Mock from 'mockjs'

Mock.setup({timeout:'50-500'})

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
                title: '课程',
                key: '/course',
                icon: 'mail',
                children: [{
                    parent:'/course',
                    title: '课程管理',
                    key: '/courses',
                    icon: 'pie-chart'
                }]
            }
        ]
    }
})
Mock.mock('/addMenuItem','post',{
    code:1,
    msg: '添加菜单成功',
    data: {
        'id':'@id',
        'key':'@guid'
    }
})
// 获取前台菜单列表
Mock.mock('/getClientMenuList', 'post', {
    code:1,
    msg: '获取菜单列表成功',
    data: [
        {
            'id': '450000199707208193',
            'key': '@guid',
            'label': '我的课堂',
            'parent': '0',
            'path': '/user',
            'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
            'params':'',
            'icon':'twoTone_appstore',
            'show':1,
            'sort':1,
        },{
            'id': '120000199506190875',
            'key': '@guid',
            'label': '招生中心',
            'parent': '0',
            'path': '/consult',
            'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
            'params':'',
            'icon':'twoTone_appstore',
            'show':1,
            'sort':2,
            children: [
                {
                    'id': '120000199506190844',
                    'key': '@guid',
                    'label': '咨询管理',
                    'parent': '120000199506190875',
                    'path': '/consult',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':1,
                },{
                    'id': '120000199506190555',
                    'key': '@guid',
                    'label': '招生宣传',
                    'parent': '120000199506190875',
                    'path': '/collection',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':2,
                }
            ]
        },{
            'id': '120000199506199999',
            'key': '@guid',
            'label': '教务中心',
            'parent': '0',
            'path': '/teacher',
            'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
            'params':'',
            'icon':'twoTone_appstore',
            'show':1,
            'sort':2,
            children: [
                {
                    'id': '220000199506190844',
                    'key': '@guid',
                    'label': '学生管理',
                    'parent': '120000199506199999',
                    'path': '/studyMan',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':1,
                },{
                    'id': '230000199506190555',
                    'key': '@guid',
                    'label': '班级管理',
                    'parent': '120000199506199999',
                    'path': '/classMan',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':2,
                },{
                    'id': '240000199506190844',
                    'key': '@guid',
                    'label': '排课管理',
                    'parent': '120000199506199999',
                    'path': '/calendar',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':3,
                },{
                    'id': '250000199506190555',
                    'key': '@guid',
                    'label': '记上课',
                    'parent': '120000199506199999',
                    'path': '/classRecord',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':4,
                },{
                    'id': '240025199506190844',
                    'key': '@guid',
                    'label': '任务管理',
                    'parent': '120000199506199999',
                    'path': '/taskMan',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':5,
                },{
                    'id': '250034199506190555',
                    'key': '@guid',
                    'label': '学情报告',
                    'parent': '120000199506199999',
                    'path': '/report',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':6,
                }
            ]
        },{
            'id': '990000202222125323',
            'key': '@guid',
            'label': '考试中心',
            'parent': '0',
            'path': '/exam',
            'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
            'params':'',
            'icon':'twoTone_appstore',
            'show':1,
            'sort':3,
            children: [
                {
                'id': '220000199506111111',
                'key': '@guid',
                'label': '考试信息管理',
                'parent': '990000202222125323',
                'path': '/examManage',
                'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                'params':'',
                'icon':'twoTone_appstore',
                'show':1,
                'sort':1,
                 },{
                    'id': '220000199506111111',
                    'key': '@guid',
                    'label': '成绩查询',
                    'parent': '990000202222125323',
                    'path': '/examResult',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':2,
                },{
                    'id': '220000199506111111',
                    'key': '@guid',
                    'label': '分析考试',
                    'parent': '990000202222125323',
                    'path': '/analysisExam',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':3,
                },
            ]
        },{
            'id': '990000200505125323',
            'key': '@guid',
            'label': '帮助与反馈',
            'parent': '0',
            'path': '/helpfeedback',
            'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
            'params':'',
            'icon':'twoTone_appstore',
            'show':1,
            'sort':3,
            children: [
                {
                    'id': '120000199505432875',
                    'key': '@guid',
                    'label': '联系我们',
                    'parent': '990000200505125323',
                    'path': '/contactUs',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':1,
                },{
                    'id': '120000199506190775',
                    'key': '@guid',
                    'label': '问题反馈',
                    'parent': '990000200505125323',
                    'path': '/feedback',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':0,
                    'sort':2,
                }
            ]
        }
    ]
})
// 获取后台菜单列表
Mock.mock('/getServerMenuList', 'post', {
    code:1,
    msg: '获取菜单列表成功',
    data: [
        {
            'id': '450000199707208194',
            'key': '@guid',
            'label': '首页',
            'parent': '0',
            'path': '/user',
            'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
            'params':'',
            'icon':'twoTone_appstore',
            'show':1,
            'sort':1,
        },{
            'id': '120000199506190876',
            'key': '@guid',
            'label': '系统',
            'parent': '0',
            'path': '/consult',
            'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
            'params':'',
            'icon':'twoTone_appstore',
            'show':1,
            'sort':2,
            children: [
                {
                    'id': '@id',
                    'key': '@guid',
                    'label': '系统设置',
                    'parent': '120000199506190876',
                    'path': '/consult',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':1,
                },{
                    'id': '@id',
                    'key': '@guid',
                    'label': '课程日志',
                    'parent': '120000199506190876',
                    'path': '/collection',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':2,
                }
            ]
        },{
            'id': '990000200505125326',
            'key': '@guid',
            'label': '统计',
            'parent': '0',
            'path': '/helpfeedback',
            'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
            'params':'',
            'icon':'twoTone_appstore',
            'show':1,
            'sort':3,
            children: [
                {
                    'id': '@id',
                    'key': '@guid',
                    'label': '访问统计',
                    'parent': '990000200505125326',
                    'path': '/contactUs',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':1,
                },{
                    'id': '@id',
                    'key': '@guid',
                    'label': '机构统计',
                    'parent': '990000200505125326',
                    'path': '/feedback',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':0,
                    'sort':2,
                }, {
                    'id': '@id',
                    'key': '@guid',
                    'label': '系统统计',
                    'parent': '990000200505125326',
                    'path': '/feedback',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':2,
                }, {
                    'id': '@id',
                    'key': '@guid',
                    'label': '系统统计1',
                    'parent': '990000200505125326',
                    'path': '/feedback',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':2,
                }, {
                    'id': '@id',
                    'key': '@guid',
                    'label': '系统统计2',
                    'parent': '990000200505125326',
                    'path': '/feedback',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':2,
                }, {
                    'id': '@id',
                    'key': '@guid',
                    'label': '系统统计3',
                    'parent': '990000200505125326',
                    'path': '/feedback',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':2,
                }, {
                    'id': '@id',
                    'key': '@guid',
                    'label': '系统统计4',
                    'parent': '990000200505125326',
                    'path': '/feedback',
                    'date':"@datetime('yyyy-MM-dd HH:mm:ss')",
                    'params':'',
                    'icon':'twoTone_appstore',
                    'show':1,
                    'sort':2,
                }
            ]
        }
    ]
})
// 获取前台菜单—父子关系
Mock.mock('/getClientParentMenu', 'post', {
    code:1,
    msg: '登录成功',
    data: [{
        label:'作为一级菜单',
        value:'0',
    },{
        label:'我的课堂',
        value:'450000199707208193',
    },{
        label:'教务中心',
        value:'120000199506199999',
    },{
        label:'考试中心',
        value:'990000202222125323',
    },{
        label:'招生中心',
        value:'120000199506190875',
    },{
        label:'帮助与反馈',
        value:'990000200505125323',
    }],
})
// 获取后台菜单—父子关系
// 获取课程列表
Mock.mock('/getCourseList', 'post',{
    code:1,
    msg: '获取课程列表成功',
    'data|20-100': [{
        id:'@increment',
        'name|1-3':'@ctitle',
        'title|1-3':'@ctitle',
        image: "@dataImage('125x125','#4A7BF7','Random')",
        category: '@integer(0, 2)', // 0.产品介绍 1.模型创作 2.Scratch
        date: '@date("yyyy-MM-dd")',
        sort: '@integer(1, 100)',
        status: '@integer(0, 1)',
        aids: '@integer(0,3)', // 教具 0未选择 1百变之星套件 2奥宝大颗粒积木 3克鲁斯编程车
        software: '@integer(0,3)', // 软件 0未选择 1Scratch3.0 2Micro:bit 3Arduino
        school: '@integer(0,2)', // 学校 0未选择 1奥松智能 2编码星球
        culture: '@integer(0,3)', // 培养对象 0未选择 1 3岁—6岁 2 6岁—10岁 3 10岁—18岁
        'desc|10-20':'@ctitle', // 课程简介
    }]
})
// 获取课程分类
Mock.mock('/getCourseCategory', 'post', {
    code:1,
    msg:'成功',
    data: [{
        id: 1,
        name: '产品介绍',
    },{
        id: 2,
        name: '模型创作',
    },{
        id: 3,
        name: 'Scratch',
    }]
})
// 获取课程教具
Mock.mock('/getCourseAids', 'post', {
    code:1,
    msg:'成功',
    data: [{
        id: 1,
        name: '百变之星套件',
    },{
        id: 2,
        name: '奥宝大颗粒积木',
    },{
        id: 3,
        name: '克鲁斯编程车',
    }]
})
// 获取课程软件
Mock.mock('/getCourseSoftware', 'post', {
    code:1,
    msg:'成功',
    data: [{
        id: 1,
        name: 'Scratch3.0',
    },{
        id: 2,
        name: 'Micro:bit',
    },{
        id: 3,
        name: 'Arduino',
    }]
})
// 获取学校列表
Mock.mock('/getCourseSchool', 'post', {
    code:1,
    msg:'成功',
    data: [{
        id: 1,
        name: '奥松智能',
    },{
        id: 2,
        name: '编码星球',
    },{
        id: 3,
        name: '极客海码',
    }]
})
// 获取课程培养对象
Mock.mock('/getCourseCulture', 'post', {
    code:1,
    msg:'成功',
    data: [{
        id: 1,
        name: '3岁—6岁',
    },{
        id: 2,
        name: '6岁—10岁',
    },{
        id: 3,
        name: '10岁—18岁',
    }]
})
// 更新课程信息
Mock.mock('/updateCourse', 'post', {
    code: 1,
    msg: '成功'
})
