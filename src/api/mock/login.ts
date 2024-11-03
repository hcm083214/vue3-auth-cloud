import Mock from "mockjs";

import { asyncRoutes } from "@/router/createRoutes";
const permissions = asyncRoutes.map(route => route.meta.permission);

const Random = Mock.Random;
Mock.mock(RegExp("/mock/login" + ".*"), "post", (options) => {
    const body = JSON.parse(options.body)
    if (body.userName === "admin" && body.password === "admin123") {
        return Mock.mock({
            code: 200,
            msg: "success",
            data: {
                token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY5NjY0NjYyNiwiaWF0IjoxNjk2NjQ2NjI2fQ.XZ5Z8Z8Z8Z8Z8Z8Z8",
                uuid: Random.guid(),
                userId: 1,
                userName: Random.cname(),
                userType: Random.string(6),
                avatar: Random.image("200x100"),
                roleIds: [1, 2],
                permissions,
            }
        })
    }
})