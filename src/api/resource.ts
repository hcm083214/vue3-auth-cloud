import service from "@/utils/request";

export type ResourceType = "D" | "M" | "B";
export interface ResourceResponse {
    resourceId: string,
    resourceName: string,
    parentId: number,
    component: string,
    resourcePath: string,
    routerName: string,
    icon: string,
    permissionKey?: string,
    orderNum?: string,
    resourceType: ResourceType,
    children: ResourceResponse[],
}

/**
 * @description: 得到国际化数据的列表
 * @param {i18nParams} params
 * @return {*}
 */
export async function getMenuListApi() {
    return await service.get<ResourceResponse[]>(`/resource/menus`);
}