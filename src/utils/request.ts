import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError
} from "axios";
import { ElMessage, ElMessageBox } from 'element-plus';
import { getToken, removeToken } from "./token.js";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

const service: AxiosInstance = axios.create({
    baseURL: '/api',
    // 超时
    timeout: 5000
})

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken() || "";
    // 从请求头中获取 isNotSetToken，如果为 false 代表不需要携带 token
    const isNotSetToken = (config.headers || {}).isNotSetToken;
    if (token && !isNotSetToken) {
        config.headers['Authorization'] = token;
    }
    return config;
})
let lock = false;
service.interceptors.response.use((response: AxiosResponse) => {
    if (response.status === 200) {
        const data = response.data;
        let msg = data.msg;
        if (data.code === 401) {
            removeToken();
            !lock && ElMessageBox.confirm(
                `${msg ? msg : '你的登陆已经过期'}，您可以继续留在该页面，或者重新登录`,
                '系统提示',
                {
                    confirmButtonText: `重新登录`,
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                location.reload();
                lock = false;
            })
            lock = true;
        }
        if (data.code === 403) {
            ElMessage({
                type: 'warning',
                message: msg
            })
        }
        return data;
    }
}, function (error: AxiosError) {
    if (error.message.indexOf("timeout") !== -1) {
        ElMessage.error("服务器响应超时");
    } else if (error.message.indexOf("Server Error") !== -1) {
        ElMessage.error("后端接口连接异常");
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
interface ResultData<T> {
    code: number;
    msg: string;
    data: T
}
export default {
    get<T>(url: string, option?: Object): Promise<ResultData<T>> {
        return service.get(url, option);
    },
    post<T>(url: string, option: AxiosRequestConfig): Promise<ResultData<T>> {
        return service.post(url, option.data, option);
    }
};