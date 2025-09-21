import http from "../../utils/http";
import { user } from "../../utils/common";


// 获取配置 https://server-admin.szyh-smart.cn/server-admin-api/v3/3rd/files/{fileId}/config
export const getWpsConfig = (fileId) => {
    return http.get(`/v3/3rd/files/${fileId}/config`);
}
