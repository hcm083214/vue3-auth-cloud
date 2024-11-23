import service from "@/utils/request";


export type ResourceType = "D" | "P" | "B";
export enum ResourceTypeEnum {
    D = "Directory",
    P = "Page",
    B = "Button",
}
export interface Resource{
    resourceId: string,
    resourceName: string,
    parentId: string,
    resourceType: ResourceTypeEnum,
    permissionKey: string,
}
export interface MenuResource extends Resource {
    routerName: string,
    routerPath: string,
    children: MenuResource[],
}
export interface ResourceResponse extends Resource {
    resourcePath: string,
    routerName: string,
    orderNum?: number,
    children: ResourceResponse[],
}



/**
 * @description: 侧边栏菜单列表
 * @param {i18nParams} params
 * @return {*}
 */
export async function getMenuListApi() {
    return await service.get<ResourceResponse[]>(`/resource/menus/tree`);
}