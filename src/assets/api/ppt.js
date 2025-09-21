import http from "../../utils/http";
import { user } from "../../utils/common";


//   =============================== chat ppt ===================================
// 生成ppt
export const generatePptFile = (data) => {
    return http.get("/api/chat/generatePptFile", {
        params:{
            ...data,
            id:data.recordId,
        },
    });
}


// ppt编辑 -> 跳转外部网站
export const pptEditor = (data) => {
    return http.get("/api/chat/pptEditor", {
        params:{
            ...data,
            taskId:data.taskId,
        },
    });
}

// 查询PPT生成进度
export const pptResult = (taskId) => {
    return http.get('/api/chat/pptResult', {
        params: { taskId }
    });
}


// ====================================  AI PPT ===================================
/**
 * 大纲生成
 * 多个参数情况下，参数优先级title>theme>text
 * @param data {
 *     id: string;  记录id
 *     text: string; PPT描述
 *     theme: string; PPT主题
 *     title: string; PPT标题
 * }
 * 请求示例
 * {
 *     "id":"1",
 *     "title":"网络安全大赛",
 *     "theme":"网络安全主题",
 *     "text":"生成一份网络安全PPT"
 * }
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getPptStructure = (data) => {
    return http.post('/api/chat/getPptStructure', data);
}


/**
 * 生成PPT
 * /api/chat/generatePpt
 * data {
 *     id: string;  记录id
 * }
 */
export const generatePpt = (data) => {
    return http.get('/api/chat/generatePpt', {
        params: data
    });
}
