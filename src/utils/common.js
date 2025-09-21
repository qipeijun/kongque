import dayjs from "dayjs";
import {message} from "ant-design-vue";
import {useUserStore} from "../store/user";


//  ============================================================ 枚举相关 ============================================================

export const APP_NAME = 'server-admin'

// 聊天状态
export const CHAT_STATUS = {
    START: 'start',
    LOADING: 'loading',
    DONE: 'done'
}

// 调用模型
export const AI_MODEL = 'dynamics-db-max'


// ============================================================ 缓存相关 ============================================================
/**
 * 获取缓存
 * @param key
 * @returns {string}
 */
export function getCache(key) {
    return JSON.parse(localStorage.getItem(`${APP_NAME}_${key}`))?.value
}

/**
 * 设置缓存
 * @param key
 * @param value
 */
export function setCache(key, value) {
    localStorage.setItem(`${APP_NAME}_${key}`, JSON.stringify({
        value,
        timestamp: Date.now()
    }))
}

/**
 * 删除缓存
 * @param key
 */
export function removeCache(key) {
    localStorage.removeItem(`${APP_NAME}_${key}`)
}

/**
 * 清空缓存
 */
export function clearCache() {
    localStorage.clear()
}

// ============================================================ 缓存相关 sessionStorage ============================================================
export function getSessionCache(key) {
    return JSON.parse(sessionStorage.getItem(`${APP_NAME}_${key}`))?.value
}
export function setSessionCache(key, value) {
    sessionStorage.setItem(`${APP_NAME}_${key}`, JSON.stringify({
        value,
        timestamp: Date.now()
    }))
}
export function removeSessionCache(key) {
    sessionStorage.removeItem(`${APP_NAME}_${key}`)
}
export function clearSessionCache() {
    sessionStorage.clear()
}



// ============================================================ 时间相关 ============================================================
/**
 * 时间格式化
 * @param date 时间
 * @param fmt 格式  默认 YYYY-MM-DD HH:mm:ss
 */
export function formatDate(date, fmt='YYYY-MM-DD HH:mm:ss') {
    if (date == null) {
        return ''
    }
    return dayjs(date).format(fmt)
}




/**
 * 生成随机id
 */
export function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}



// ============================================================ 用户相关 ============================================================
export const user = {
    getToken: () => getCache('token'),
    setToken: (data) => setCache('token', data),
    clearToken: () => removeCache('token'),

    setUserInfo: (data) => setCache('userInfo', data),
    getUserInfo: () => getCache('userInfo') || {},
    clearUserInfo: () => removeCache('userInfo'),
    getUserId: () => getCache('userInfo')?.id || '1', // 1:调试使用

    setUserCode: (data) => setCache('userCode', data),
    getUserCode: () => getCache('userCode') || '',
    clearUserCode: () => removeCache('userCode'),
}


/**
 * 下载文件 word
 * @param url
 * @param filename
 * @returns {Promise<void>}
 */
export async function downloadByFetch(url, filename = 'download',type='docx') {
    try {
        const res = await fetch(url, {
            method: 'GET',
            // 如果需要 token，添加 headers:
            // headers: { Authorization: 'Bearer your_token' }
        })

        if (!res.ok) throw new Error('下载失败')

        const blob = await res.blob()
        const blobUrl = URL.createObjectURL(blob)

        const a = document.createElement('a')
        a.href = blobUrl
        a.download = filename + `.${type}`
        console.log('下载文件名:',a.download)
        document.body.appendChild(a)
        a.click()

        document.body.removeChild(a)
        URL.revokeObjectURL(blobUrl)
    } catch (error) {
        console.error('下载错误：', error)
    }
}



export function copyToClipboard(text) {
    if (!text) return;

    // 先尝试使用 Clipboard API（现代浏览器）
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text).then(() => {
            console.log('复制成功');
            message.success('已复制');
        }).catch(err => {
            console.error('Clipboard API 复制失败，尝试降级方法：', err);
            fallbackCopyText(text);
        });
    } else {
        // 不支持 Clipboard API，使用兼容性方案
        fallbackCopyText(text);
    }

    // 兼容性复制方法（execCommand）
    function fallbackCopyText(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';  // 避免页面滚动
        textarea.style.top = '-9999px';
        textarea.style.left = '-9999px';

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        try {
            const successful = document.execCommand('copy');
            console.log(successful ? '复制成功（兼容模式）' : '复制失败（兼容模式）');
            successful && message.success('已复制');
        } catch (err) {
            console.error('复制失败（兼容模式）：', err);
        }

        document.body.removeChild(textarea);
    }
}
