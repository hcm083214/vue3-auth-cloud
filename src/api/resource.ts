import service from "@/utils/request";


export type ResourceType = "D" | "M" | "B";

export interface Resource{
    resourceId: string,
    resourceName: string,
    parentId: number,
}

export interface ResourceResponse extends Resource {
    resourcePath: string,
    routerName: string,
    permissionKey: string,
    orderNum?: number,
    resourceType: ResourceType,
    children: ResourceResponse[],
}



/**
 * @description: 侧边栏菜单列表
 * @param {i18nParams} params
 * @return {*}
 */
export async function getMenuListApi() {
    return await service.get<ResourceResponse[]>(`/resource/menus`);
}