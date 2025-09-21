import { computed } from 'vue'
import { theme } from 'ant-design-vue'

/**
 * 主题样式管理
 * 提供应用的主题样式配置和响应式样式计算
 */
export function useTheme() {
  const { token } = theme.useToken()

  // 计算响应式样式
  const styles = computed(() => {
    return {
      // 主布局容器样式
      'layout': {
        'width': '100vw',
        'height': 'calc(100vh - 90px)',
        'display': 'flex',
        'background': `${token.value.colorBgContainer}`,
        'font-family': `AlibabaPuHuiTi, ${token.value.fontFamily}, sans-serif`,
      },

      // 侧边栏样式
      'menu': {
        'background': `${token.value.colorBgLayout}80`,
        'width': '280px',
        'height': '100%',
        'display': 'flex',
        'flex-direction': 'column',
      },

      // 会话列表容器样式
      'conversations': {
        'padding': '0 12px',
        'flex': 1,
        'overflow-y': 'auto',
      },

      // 聊天区域样式
      'chat': {
        'height': '100%',
        'width': '100%',
        'flex': '1',
        'box-sizing': 'border-box',
        'display': 'flex',
        'flex-direction': 'column',
        'padding': `${token.value.paddingLG}px`,
        'gap': '16px',
        'border-radius': '10px',
        'border':'1px solid #D4D4D4'
      },

      // 消息列表样式
      'messages': {
        flex: 1,
      },

      // 占位符样式
      'placeholder': {
        'padding-top': '32px',
        'text-align': 'left',
        'flex': 1,
      },

      // 发送器样式
      'sender': {
        'box-shadow': token.value.boxShadow,
      },

      // Logo区域样式
      'logo': {
        'display': 'flex',
        'height': '72px',
        'align-items': 'center',
        'justify-content': 'start',
        'padding': '0 24px',
        'box-sizing': 'border-box',
      },

      // Logo图片样式
      'logo-img': {
        width: '24px',
        height: '24px',
        display: 'inline-block',
      },

      // Logo文字样式
      'logo-span': {
        'display': 'inline-block',
        'margin': '0 8px',
        'font-weight': 'bold',
        'color': token.value.colorText,
        'font-size': '16px',
      },

      // 添加按钮样式
      'addBtn': {
        background: '#1677ff0f',
        border: '1px solid #1677ff34',
        width: 'calc(100% - 24px)',
        margin: '0 12px 24px 12px',
      },
    }
  })

  return {
    styles,
    token
  }
}
