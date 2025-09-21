import {AI_MODEL, user} from "../../utils/common";
import http from "../../utils/http";

/**
 * @param {Object} data
 * @param {Object} data.params - 请求参数
 * @param {function} data.onMessage - 每次接收到内容的回调（chunk）
 * @param {AbortController} [data.controller] - 可选，外部传入的AbortController
 * @param {() => boolean} [data.shouldPause] - 可选，用于判断是否暂停读取
 */
export const fetchChatStream = async ({ params, onMessage, controller, shouldPause,onSessionId }) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || ''
    const abortController = controller || new AbortController()
    let fullText = ''

    const response = await fetch(`${baseUrl}/api/chat/stream`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.getToken()}`,
            'M-UserCode':user.getUserCode()
        },
        signal: abortController.signal, // 添加取消信号
        body: JSON.stringify({
            model: AI_MODEL,
            ...params
        })
    })

    if (!response.body) throw new Error('无可读流')

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let buffer = ''

    while (true) {
        // === ⏸️ 暂停检测 ===
        if (typeof shouldPause === 'function' && shouldPause()) {
            await new Promise(resolve => setTimeout(resolve, 100)) // 每100ms检查一次
            continue
        }

        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()

        for (const line of lines) {
            if (line.startsWith('data:')) {
                const data = line.replace(/^data:\s*/, '')
                if (data === '[DONE]') continue

                let content = ''
                let sessionId = ''
                try {
                    const dataParse = JSON.parse(data)
                    content = dataParse.content
                    sessionId = dataParse.sessionId
                    sessionId && onSessionId && onSessionId(sessionId)
                } catch (e) {
                    console.error('解析失败', e)
                }

                fullText += content
                onMessage?.(content)
            }
        }
    }

    return fullText
}


/**
 * 停止聊天
 * data {model    sessionId}
 */
export const chatStop = (data) => {
    return http.post('/api/chat/stop',{
        model:AI_MODEL,
        ...data
    })
}


// 使用http的方式获取聊天内容
export const fetchChat = (data) => {
    return http.get(`/api/textbook/node/chapter/${data.chapterId}`,)
}
