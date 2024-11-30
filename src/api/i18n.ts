import service from "@/utils/request";
import { support_locales } from "@/utils/i18n";
import { Page,PageParams } from "@/api/types";

export interface i18nParams {
    // 语言环境
    i18nId?: Number,
    locale?: string,
    i18nModule?: string,
    i18nKey?: string,
}

export interface i18nResponse {
    i18nId:number,
    locale:support_locales,
    i18nModule:string,
    i18nKey:string,
    i18nValue:string,
    createTime?:Date,
}


export type searchI18nListParams = i18nParams & PageParams

/**
 * @description: 得到国际化数据的列表
 * @param {i18nParams} params
 * @return {*}
 */
export async function getIl8nListApi(params: searchI18nListParams) {
    return await service.get<Page<i18nResponse>>(`/language/list`, {
        params
    });
}

/**
 * @description: 新增一个key对应的语言
 * @param {i18nParams} params
 * @return {*}
 */
export async function addIl8nListApi(i18nData: i18nResponse[]) {
    return await service.post<String>(`/language`, {
        data: i18nData
    });
}

/**
 * @description: 修改数据
 * @param {i18nParams} params
 * @return {*}
 */
export async function editIl8nListApi(i18nData: i18nResponse) {
    return await service.put<String>(`/language`, {
        data: i18nData
    });
}

export async function deleteIl8n(i18nId: Number) {
    return await service.delete<String>(`/language/i18n_id/${i18nId}`, {});
}

/**
 * @description: 得到整个语言环境所有的国际化数据
 * @param {i18nParams} params
 * @return {*}
 */
export async function getIl8nPackageApi() {
    return await service.get<i18nResponse[]>(`/language/locale`);
}