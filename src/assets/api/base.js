import http from "../../utils/http";
import { user } from "../../utils/common";

//获取课程章节
export const fetchCourseChapters = () => {
    return http.get("/api/subjectInfo/getTreeList");
};


// 获取 recordId
export const generateInstructions = (data) => {
    return http.post("/api/chat/generateInstructions", {
        ...data
    });
};


// 获取附件地址
export const generateFile = (data) => {
    return http.get("/api/chat/generateFile", {
        params:{
            ...data
        }
    });
};


// 获取聊天记录  参数 userId
export const chatPage = (data) => {
    return http.post("/api/chat/page", {
        userId: user.getUserId(),
        ...data
    });
}


// 获取用户信息
export const memberInfo = (data) => {
    return http.get("/api/member/info", {
        params:{
            ...data
        }
    });
};


