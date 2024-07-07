import Mock from "mockjs";

Mock.mock(RegExp("/mock/resource/menus" + ".*"), "get", () => {
    return {
        code: 200,
        msg: "success",
        data: [
            {
                id: 1,
                name: "首页",
                icon: "el-icon-s-home",
                path: "/",
                children: []
            },
            {
                id: 2,
                name: "系统工具",
                icon: "el-icon-s-tools",
                path: "",
                children: [
                    {
                        id: 21,
                        name: "国际化工具",
                        icon: "el-icon-i18n",
                        path: "/tool/language",
                        children: []
                    },
                    {
                        id: 22,
                        name: "角色管理",
                        icon: "el-icon-user-solid",
                        path: "/tool/log",
                        children: []
                    },
                ]
            }]
    }
})