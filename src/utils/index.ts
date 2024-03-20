import { dayjs } from 'element-plus'
export function setCssVar(key: string, value: any, dom = document.documentElement) {
    dom.style.setProperty(key, value)
}

export function dataFormat(date: string | Date, formatStr: string) {
    return dayjs(date).format(formatStr)
}

export function isEmptyObj(obj: Object | null) {
    if(obj === null || obj === "{}") return true
    return Object.keys(obj).length === 0 && obj.constructor === Object
}