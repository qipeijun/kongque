import http from "../../utils/http";
import { user } from "../../utils/common";


// 获取配置 https://edu-test-ai-chat.szyh-smart.cn/edu-ai-api/v3/3rd/files/{fileId}/config
export const getWpsConfig = (fileId) => {
    return http.get(`/v3/3rd/files/${fileId}/config`);
}
