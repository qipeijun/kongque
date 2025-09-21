/**
 * 用户相关的持久化存储
 */
import {defineStore} from 'pinia'
import {setCache, getCache, APP_NAME} from '@/utils/common.js'

export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: getCache(`${APP_NAME}_userInfo`) || {},
    }),
    getters: {
        getUserInfo: (state) => state.userInfo,
        getUserId: (state) => state.userInfo.id || '',
        getUserCode: (state) => state.userInfo.code || '',
        getUserName: (state) => state.userInfo.nickName || '',
    },
    actions: {
        setUserInfo(userInfo) {
            this.userInfo = userInfo
            setCache(`userInfo`, userInfo)
        },
    },
})
