// src/utils/http.js
import axios from 'axios';
import { message, Modal } from 'ant-design-vue';
import router from '@/router';
import {getCache, user, removeCache} from './common';

// ===== 错误码枚举 =====
const ERROR_CODE = {
    SUCCESS: 0,
    BAD_REQUEST_ERROR: 400,
    UNAUTH_ERROR: 401,
    RESPONSE_NOT_LOGIN: 406,
    SYSTEM_SERVER_ERROR: 500,
    INVALID_PARAM: 600,
    RESOURCE_EXISTED: 601,
    RESOURCE_NOT_EXISTED: 602,
    FORBIDDEN: '403',
    NOT_FOUND: '404',
};

const ERROR_MSG = {
    [ERROR_CODE.SUCCESS]: "成功",
    [ERROR_CODE.BAD_REQUEST_ERROR]: "错误的请求",
    [ERROR_CODE.UNAUTH_ERROR]: "未授权的请求",
    [ERROR_CODE.RESPONSE_NOT_LOGIN]: "您的账号在其他地方登陆了",
    [ERROR_CODE.SYSTEM_SERVER_ERROR]: "系统服务异常",
    [ERROR_CODE.INVALID_PARAM]: "错误的参数",
    [ERROR_CODE.RESOURCE_EXISTED]: "资源已存在",
    [ERROR_CODE.RESOURCE_NOT_EXISTED]: "资源不存在",
};

// ===== 请求取消管理 =====
const controllerMap = new Map();

// ===== 防止重复弹窗 =====
let isModalVisible = false;
const handle401Error = () => {
    if (isModalVisible) return;

    isModalVisible = true;

    Modal.confirm({
        title: '认证失效',
        content: '您的登录凭证已过期或无效，请重新登录。',
        okText: '重新登录',
        cancelText: '取消',
        onOk: () => {
            removeCache('token');
            // router.replace({ path: '/login' });
        },
        onCancel: () => {
            console.log('用户取消重新登录');
        },
        afterClose: () => {
            isModalVisible = false;
        },
    });
};

// ===== 创建 Axios 实例 =====
const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '',
    timeout: 1000*60*30,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'M-UserCode':user.getUserCode()
    },
});

// ===== 请求拦截器 =====
http.interceptors.request.use(
    (config) => {
        const token = user.getToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers['M-UserCode'] = user.getUserCode();
        }

        // 添加取消控制器
        const controller = new AbortController();
        config.signal = controller.signal;

        const key = `${config.method}-${config.url}`;
        controllerMap.set(key, controller);

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ===== 响应拦截器 =====
http.interceptors.response.use(
    (response) => {
        const res = response.data;
        // 响应成功，正常返回
        if (res.code === ERROR_CODE.SUCCESS) {
            return res;
        }

        if (res.code === ERROR_CODE.UNAUTH_ERROR) {
            handle401Error();
        } else if (ERROR_MSG[res.code]) {
            message.error(ERROR_MSG[res.code]);
        } else {
            message.error(res.message || res.msg || '请求失败');
        }

        return Promise.reject(new Error(res.message || '请求异常'));
    },
    (error) => {
        if (axios.isCancel(error)) {
            console.warn('[请求已取消]', error.message);
            return Promise.reject(error);
        }

        let msg = '发生未知错误';

        if (error.response) {
            const { status, config: { url = '' } = {} } = error.response;
            switch (status) {
                case ERROR_CODE.UNAUTH_ERROR:
                    msg = ERROR_MSG[ERROR_CODE.UNAUTH_ERROR];
                    handle401Error();
                    return Promise.reject(error);
                case ERROR_CODE.BAD_REQUEST_ERROR:
                    msg = ERROR_MSG[ERROR_CODE.BAD_REQUEST_ERROR];
                    break;
                case ERROR_CODE.RESPONSE_NOT_LOGIN:
                    msg = ERROR_MSG[ERROR_CODE.RESPONSE_NOT_LOGIN];
                    break;
                case ERROR_CODE.SYSTEM_SERVER_ERROR:
                    msg = ERROR_MSG[ERROR_CODE.SYSTEM_SERVER_ERROR];
                    break;
                case ERROR_CODE.INVALID_PARAM:
                    msg = ERROR_MSG[ERROR_CODE.INVALID_PARAM];
                    break;
                case ERROR_CODE.RESOURCE_EXISTED:
                    msg = ERROR_MSG[ERROR_CODE.RESOURCE_EXISTED];
                    break;
                case ERROR_CODE.RESOURCE_NOT_EXISTED:
                    msg = ERROR_MSG[ERROR_CODE.RESOURCE_NOT_EXISTED];
                    break;
                case ERROR_CODE.FORBIDDEN:
                    msg = '无权限访问此资源。';
                    break;
                case ERROR_CODE.NOT_FOUND:
                    msg = `请求地址不存在：${url}`;
                    break;
                case 502:
                case 503:
                    msg = '服务器错误，请稍后重试。';
                    break;
                default:
                    msg = `请求错误，状态码：${status}`;
            }
        } else if (error.request) {
            msg = '网络异常或请求超时。';
        } else {
            msg = error.message || msg;
        }

        message.error(msg);
        return Promise.reject(error);
    }
);

// ===== 取消请求方法 =====
export function cancelRequest(method, url) {
    const key = `${method}-${url}`;
    const controller = controllerMap.get(key);
    if (controller) {
        controller.abort(`请求已取消：${url}`);
        controllerMap.delete(key);
    }
}

// ===== 导出封装实例 =====
export default http;
