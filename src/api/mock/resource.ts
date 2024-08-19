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
                parentId: 0,
                children: []
            },
            {
                resourceId: 2,
                resourceName: "系统工具",
                resourceIcon: "el-icon-s-tools",
                resourcePath: "/tool",
                resourceType: "D",
                routerName: "",
                parentId: 0,
                children: [
                    {
                        resourceId: 3,
                        resourceName: "国际化工具",
                        resourceIcon: "el-icon-i18n",
                        resourcePath: "/tool/language",
                        resourceType: "D",
                        parentId: 2,
                        children: [
                            {
                                resourceId: 4,
                                resourceName: "国际化新增",
                                resourceIcon: "el-icon-i18n",
                                resourcePath: "/tool/language",
                                resourceType: "M",
                                routerName: "language",
                                parentId: 3,
                                children: []
                            },
                            {
                                resourceId: 5,
                                resourceName: "国际化修改",
                                resourceIcon: "el-icon-i18n",
                                resourcePath: "/tool/language",
                                resourceType: "M",
                                routerName: "register",
                                parentId: 3,
                                children: []
                            },
                        ]
                    },
                    {
                        resourceId: 6,
                        resourceName: "日志管理",
                        resourceIcon: "el-icon-user-solid",
                        resourcePath: "/tool/log",
                        resourceType: "D",
                        routerName: "log",
                        parentId: 2,
                        children: [
                            {
                                resourceId: 7,
                                resourceName: "日志修改",
                                resourceIcon: "el-icon-i18n",
                                resourcePath: "/tool/log",
                                resourceType: "M",
                                routerName: "log",
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