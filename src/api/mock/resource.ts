import Mock from "mockjs";
import { mockPageData } from './utils';

const router = [
    {
        resourceId: 1,
        resourceName: "首页",
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
        resourcePath: "",
        resourceType: "D",
        routerName: "",
        parentId: 0,
        children: [
            {
                resourceId: 3,
                resourceName: "国际化工具",
                resourcePath: "/system/language",
                resourceType: "D",
                parentId: 2,
                children: [
                    {
                        resourceId: 4,
                        resourceName: "国际化新增",
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
                resourcePath: "",
                resourceType: "D",
                routerName: "log",
                parentId: 2,
                children: [
                    {
                        resourceId: 7,
                        resourceName: "日志修改",
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
];

Mock.mock(RegExp("/mock/resource/menus" + ".*"), "get", () => {
    return Mock.mock({
        code: 200,
        msg: "success",
        data: router,
    })
})

Mock.mock(RegExp("/mock/resource" + ".*"), "get", (options) => {
    const ResourceTypeEnum = ["D", "P", "B"]
    return mockPageData(options, (Random) => ({
        resourceName: Random.string(4, 8),
        resourceType: ResourceTypeEnum[Random.natural(0, 2)],
        permissionKey: Random.string(3, 15),
        parentPermissionKey: Random.string(3, 15),
        resourceId: Random.increment(),
        parentId: Random.increment(),
        resourcePath: Random.url(),
        orderNum: Random.increment(),
    }))
})