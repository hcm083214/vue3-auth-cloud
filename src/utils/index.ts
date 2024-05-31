import { dayjs } from 'element-plus'
export function setCssVar(key: string, value: any, dom = document.documentElement) {
    dom.style.setProperty(key, value)
}

export function dataFormat(date: string | Date, formatStr: string) {
    return dayjs(date).format(formatStr)
}

export function isEmptyObj(obj: Object | null) {
    if (obj === null || obj === "{}") return true
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

export function getPathQuery(path: string) {
    const query = path.split('?')[1]
    const queryObj : { [key: string]: string } = {}
    if (query) {
        const queryArr = query.split('&')
        queryArr.forEach(item => {
            const itemArr = item.split('=');
            queryObj[itemArr[0]] = itemArr[1];
        })
    }
    return queryObj;
}