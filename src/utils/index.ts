import { dayjs } from 'element-plus'
import { it } from 'element-plus/es/locale'
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
    const queryObj: { [key: string]: string } = {}
    if (query) {
        const queryArr = query.split('&')
        queryArr.forEach(item => {
            const itemArr = item.split('=');
            queryObj[itemArr[0]] = itemArr[1];
        })
    }
    return queryObj;
}

export function getTreesNodeByIds<T>(tree: T[], ids: string[], idKeyName: string = 'id') {
    const result: T[] = [];
    const idSet = new Set(ids);
    function _getTreesItemByIds(tree: T[]) {
        // 检查 node 是否包含 idKeyName
        tree.forEach(node => {
            if ((node as any)[idKeyName] !== undefined && idSet.has((node as any)[idKeyName])) {
                result.push(node);
            }
            if ((node as any).children) {
                _getTreesItemByIds((node as any).children)
            }
        })
    }
    // 处理空树的情况
    if (tree.length === 0) {
        return result;
    }
    // 开始递归搜索
    _getTreesItemByIds(tree);

    return result;
}