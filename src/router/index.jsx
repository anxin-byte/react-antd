const router = [
    {
        title: '控制台',
        icon: 'laptop',
        key: '/dashboard',
        role: ["user", "information", "product"]
    },
    {
        title: '用户管理',
        icon: 'laptop',
        key: '/dashboard/user',
        role: ["information", "user"],
        child: [
            {key: '/dashboard/user/list', title: '用户列表', icon: '', role: ["user"]},
            {
                key: '/dashboard/user/add',
                title: '添加用户',
                icon: '',
                role: ["user"]
            }
        ]
    },
    {
        title: '部门管理',
        icon: 'bars',
        key: '/dashboard/department',
        role: ["user"],
        child: [
            {key: '/dashboard/department/list', title: '部门列表', icon: '', role: ["user"] },
            {key: '/dashboard/department/add', title: '添加部门', icon: '', role: ["user"] },
        ]
    },
    {
        title: '职位管理',
        icon: 'edit',
        key: '/dashboard/job',
        role: ["user"],
        child: [
            {key: '/dashboard/job/JobList', title: '职位列表', icon: ''},
            {key: '/dashboard/job/JobAdd', title: '添加职位', icon: ''}
        ]
    },
    {
        title: '职员管理',
        icon: 'edit',
        key: '/dashboard/staff',
        child: [
            {key: '/dashboard/staff/List', title: '职员列表', icon: ''},
            {key: '/dashboard/staff/Add', title: '添加职员', icon: ''}
        ]
    },
    {
        title: '请假',
        icon: 'info-circle-o',
        key: '/home/about'
    },
    {
        title: '加班',
        icon: 'info-circle-o',
        key: '/home/abouta'
    }
]
export default router;