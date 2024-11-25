import service from "@/utils/request";


export type ResourceType = "D" | "P" | "B";
export enum ResourceTypeEnum {
    D = "Directory",
    P = "Page",
    B = "Button",
}
export interface Resource{
    resourceName: string, 
    resourceType: ResourceTypeEnum,
    permissionKey: string,
    parentPermissionKey: string,
}
export interface MenuResource extends Resource {
    routerName: string,
    routerPath: string,
    children: MenuResource[],
}
export interface ResourceResponse extends Resource {
    resourceId: string,
    parentId: string,
    resourcePath?: string,
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