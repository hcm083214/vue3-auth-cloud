import service from "@/utils/request";
import { I18nData,Page } from "@/api/types";

export interface i18nParams {
    // 语言环境
    i18nId?:Number,
    locale?:string,
    i18nModule?: string,
    i18nKey?: string,
}

interface PageParams {
    current:Number,
    size:Number,
}
export type searchI18nListParams = i18nParams & PageParams
/**
 * @description: 得到国际化数据的列表
 * @param {i18nParams} params
 * @return {*}
 */
export async function getIl8nListApi(params: searchI18nListParams) {
    return await service.get<Page<I18nData>>(`/i18n/list`, {
        params
    });
}

/**
 * @description: 新增一个key对应的语言
 * @param {i18nParams} params
 * @return {*}
 */
export async function addIl8nListApi(i18nData: I18nData[]) {
    return await service.post<String>(`/i18n/add`, {
        data: i18nData
    });
}

/**
 * @description: 修改数据
 * @param {i18nParams} params
 * @return {*}
 */
export async function editIl8nListApi(i18nData: I18nData) {
    return await service.post<String>(`/i18n/edit`, {
        data: i18nData
    });
}

export async function deleteIl8n(i18nId: Number) {
    return await service.post<String>(`/i18n/i18n_id/${i18nId}`,{});
}

/**
 * @description: 得到整个语言环境所有的国际化数据
 * @param {i18nParams} params
 * @return {*}
 */
export async function getIl8nPackageApi(params: i18nParams) {
    return await service.get<I18nData[]>(`/i18n/locale/${params.locale}`);
}