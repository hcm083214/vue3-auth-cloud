import service from "@/utils/request";
import { Page } from "@/api/types";

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
    resourceId: number,
    parentId: number,
    resourcePath?: string,
    orderNum?: number,
}



/**
 * @description: 侧边栏菜单列表
 * @param {i18nParams} params
 * @return {*}
 */
export async function getMenuListApi() {
    return await service.get<ResourceResponse[]>(`/resource/menus/tree`);
}

/**
 * @description: 侧边栏菜单列表
 * @param {i18nParams} params
 * @return {*}
 */
export async function getSystemResourceApi() {
    return await service.get<Page<ResourceResponse>>(`/resource`);
}