export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.manage-customer', link: '/system/user-customer'
            },
        ]
    },
    { //quản lý sách
        name: 'menu.admin.book',
        menus: [
            {
                name: 'menu.admin.manage-book', link: '/system/manage-book'
            }
        ]
    },
    { //quản lý danh mục
        name: 'menu.admin.category',
        menus: [
            {
                name: 'menu.admin.manage-category', link: '/system/manage-category'
            }
        ]
    },
    { //quản lý bài đăng
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            }
        ]
    },
];