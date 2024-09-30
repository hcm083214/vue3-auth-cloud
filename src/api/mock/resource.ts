import Mock from "mockjs";

Mock.mock(RegExp("/mock/resource/menus" + ".*"), "get", () => {
    return Mock.mock({
        code: 200,
        msg: "success",
        data: [
            {
                resourceId: 1,
                resourceName: "首页",
                resourceIcon: "el-icon-s-home",
                resourcePath: "/home",
                resourceType: "M",
                routerName: "home",
                permissionKey: "home",
                parentId: 0,
                children: []
            },
            {
                resourceId: 2,
                resourceName: "系统工具",
                resourceIcon: "el-icon-s-tools",
                resourcePath: "",
                resourceType: "D",
                routerName: "",
                parentId: 0,
                children: [
                    {
                        resourceId: 3,
                        resourceName: "国际化工具",
                        resourceIcon: "el-icon-i18n",
                        resourcePath: "/system/language",
                        resourceType: "D",
                        parentId: 2,
                        children: [
                            {
                                resourceId: 4,
                                resourceName: "国际化新增",
                                resourceIcon: "el-icon-i18n",
                                resourcePath: "/system/language",
                                resourceType: "M",
                                routerName: "language",
                                permissionKey: "language",
                                parentId: 3,
                                children: []
                            },
                        ]
                    },
                    {
                        resourceId: 6,
                        resourceName: "日志管理",
                        resourceIcon: "el-icon-user-solid",
                        resourcePath: "",
                        resourceType: "D",
                        routerName: "log",
                        parentId: 2,
                        children: [
                            {
                                resourceId: 7,
                                resourceName: "日志修改",
                                resourceIcon: "el-icon-i18n",
                                resourcePath: "/system/log",
                                resourceType: "M",
                                routerName: "log",
                                permissionKey: "log",
                                parentId: 6,
                                children: []
                            },
                        ]
                    },
                ]
            }
        ]
    })
})