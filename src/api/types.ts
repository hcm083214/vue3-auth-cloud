export interface Captcha {
    uuid: string,
    captchaEnabled: boolean,
    base64Url: string,
}

export interface UserInfo {
    uuid: string,
    roleId: number,
    userName: string,
    userType: string,
    avatar: string,
    token: string,
    roleIds: number[],
    authorizeUrl: Location,
    permissions: number[],
}

export interface Count {
    [att:string]: number;
}



export interface RoleList {
    roleId: number,
    roleNameCn: string,
    roleNameEn: string,
    roleDescriptionCn: string,
    roleDescriptionEn: string,
    functionJson: string,
    functionList: FunctionList[],
    roleSort?: number,
    status?: string,
    createTime?: Date
}

export interface Page<T> {
    total: number, // 查询列表总记录数
    current: number, // 当前页
    size: number, // 每页显示条数
    pages: number, // 总页数
    records: T[] // 查询数据列表
}

export interface FunctionList {
    functionId: number,
    functionNameCn: string,
    functionNameEn: string,
    functionKey: string,
    functionDescriptionCn: string,
    functionDescriptionEn: string,
    status?: string,
    createTime?: Date,
    createBy?: string,
    updateTime?: Date,
    updateBy?: string,
}