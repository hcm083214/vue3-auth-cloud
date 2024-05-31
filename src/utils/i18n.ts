import { createI18n } from "vue-i18n";
import { nextTick } from 'vue'

import { getIl8nPackageApi } from "@/api/i18n";
import { I18nData } from "@/api/types";
import locales_package from "@/assets/language/index";
import { isEmptyObj } from "@/utils/index";

const LOCALE_KEY = 'Locale'
const LOCALE_PACKAGE_KEY = 'locale_package';

export type support_locales = "en-US" | "zh-CN";
export const LOCALE: support_locales = "zh-CN";
export const SUPPORT_LOCALES_LIST: support_locales[] = ["en-US", "zh-CN"];

export function getLocale() {
    return localStorage.getItem(LOCALE_KEY) as support_locales || navigator.language || LOCALE;
}

export function setLocale(locale: support_locales) {
    return localStorage.setItem(LOCALE_KEY, locale)
}

export function removeLocale() {
    return localStorage.removeItem(LOCALE_KEY);
}

export function isStorageNotExitLocalePackage() {
    const localePackage = localStorage.getItem(LOCALE_PACKAGE_KEY);
    if (localePackage == null) {
        return true;
    } else {
        return isEmptyObj(JSON.parse(localePackage));
    }
}

type LocalePackageData = {
    [key: string]: string | LocalePackageData
}

type LocalePackage = {
    [key in support_locales]: LocalePackageData
}

function getLocalePackage(): LocalePackage {
    if (isStorageNotExitLocalePackage()) {
        return locales_package;
    }
    return JSON.parse(localStorage.getItem(LOCALE_PACKAGE_KEY)!)
}

function setLocalePackage(localePackage: LocalePackage) {
    const localePackageJson = JSON.stringify(localePackage);
    return localStorage.setItem(LOCALE_PACKAGE_KEY, localePackageJson);
}

function removeLocalePackage() {
    return localStorage.removeItem(LOCALE_PACKAGE_KEY);
}


export const i18n = createI18n({
    // 使用 Composition API 模式，则需要将其设置为false
    legacy: false,
    // 全局注入 $t 函数
    globalInjection: true,
    // 关闭waring提示信息
    silentTranslationWarn: true
});

const { t } = i18n.global
export const $t = t;

function formatLocalePackage(i18nData: I18nData[]) {
    const localePackage = {} as LocalePackage;
    i18nData.forEach(i => {
        if (!localePackage[i.locale]) {
            localePackage[i.locale] = {} as LocalePackageData
        }
        const localePackageData = localePackage[i.locale];
        type obj = { [key: string]: string }
        if (!localePackageData[i.i18nModule]) {
            localePackageData[i.i18nModule] = {} as obj;
        }
        const module = localePackageData[i.i18nModule] as obj;
        module[i.i18nKey] = i.i18nValue;
    })
    return localePackage;
}

function isNeedChangeLocale(locale: support_locales) {
    if (locale !== getLocale() || isStorageNotExitLocalePackage()) {
        return true;
    } else {
        return false;
    }
}
/**
 * @description: 异步加载语言包
 * @param {support_locales} locale 
 * @return {*}
 */
export async function loadLanguageAsync(locale: support_locales) {
    if (isNeedChangeLocale(locale)) {
        const result = await getIl8nPackageApi();
        if (result.code === 200) {
            const localePackage = formatLocalePackage(result.data)
            i18n.global.setLocaleMessage(locale, localePackage[locale]);
            setLocalePackage(localePackage);
            setLocale(locale);
            location.reload();
        }
    } else {
        const localePackage = getLocalePackage();
        i18n.global.setLocaleMessage(locale, localePackage[locale]);
    }
    i18n.global.locale.value = locale;
    (document.querySelector('html') as HTMLHtmlElement).setAttribute('lang', locale);

    return nextTick();
}

export default i18n;
