import service from "@/utils/request";

export interface ResourceResponse {
    resourceId: number,
    resourceName: string,
    parentId: number,
    component: string,
    path: string,
    icon: string,
    perms?: string,
    orderNum?: string,
    resourceType: string,
    children: ResourceResponse[],
}

/**
 * @description: 得到国际化数据的列表
 * @param {i18nParams} params
 * @return {*}
 */
export async function getMenuListApi() {
    return await service.get<ResourceResponse>(`/resource/menu`);
}