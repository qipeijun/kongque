import { defineStore } from 'pinia'
import { setCache, getCache, APP_NAME } from '@/utils/common.js'
import {getSessionCache, setSessionCache} from "../utils/common";

// 聊天记录缓存key（带应用前缀，防止冲突）
const CACHE_KEY = 'chat_messages'

/**
 * 聊天消息全局状态管理
 * 支持本地持久化，可通过 persistMessages 控制是否缓存
 */
export const useChatStore = defineStore('chat', {
    state: () => ({
        messages: [], // 聊天消息列表
        persistMessages: true, // 是否持久化到本地缓存
    }),
    actions: {
        /**
         * 添加一条消息
         */
        addMessage(message) {
            this.messages.push(message)
            this._persistIfNeeded()
        },
        /**
         * 批量设置消息
         */
        setMessages(messages) {
            this.messages = messages
            this._persistIfNeeded()
        },
        /**
         * 根据id更新消息
         */
        updateMessageById(id, data) {
            const idx = this.messages.findIndex(m => m.id === id)
            if (idx !== -1) {
                this.messages[idx] = { ...this.messages[idx], ...data }
                this._persistIfNeeded()
            }
        },
        /**
         * 根据recordId更新消息
         */
        updateMessageByRecordId(recordId, data) {
            const idx = this.messages.findIndex(m => m.recordId === recordId)
            if (idx !== -1) {
                this.messages[idx] = { ...this.messages[idx], ...data }
                this._persistIfNeeded()
            }
        },
        /**
         * 根据id删除消息
         */
        removeMessageById(id) {
            this.messages = this.messages.filter(m => m.id !== id)
            this._persistIfNeeded()
        },
        /**
         * 清空所有消息
         */
        clearMessages() {
            this.messages = []
            this._persistIfNeeded()
        },
        /**
         * 内部方法：如需持久化则写入缓存
         */
        _persistIfNeeded() {
            if (this.persistMessages) {
                setSessionCache(CACHE_KEY, this.messages)
            }
        },
        /**
         * 从本地缓存恢复消息
         */
        loadMessagesFromCache() {
            if (this.persistMessages) {
                const cache = getSessionCache(CACHE_KEY)
                if (cache) {
                    this.messages = cache
                }
            }
        }
    },
})

