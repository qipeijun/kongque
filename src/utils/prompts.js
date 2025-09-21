import { h } from 'vue'
import { Space } from 'ant-design-vue'
import {
  FireOutlined,
  ReadOutlined,
  HeartOutlined,
  SmileOutlined,
  CommentOutlined
} from '@ant-design/icons-vue'

/**
 * 渲染带图标的标题
 * @param {VNode} icon - 图标组件
 * @param {string} title - 标题文字
 * @returns {VNode} 渲染的标题组件
 */
export function renderTitle(icon, title) {
  return h(Space, { align: 'start' }, () => [icon, h('span', title)])
}

/**
 * 占位符提示词配置
 * 用于空状态下的提示词展示
 */
export const placeholderPromptsItems = [
  {
    key: '1',
    label: renderTitle(
      h(FireOutlined, { style: { color: '#FF4D4F' } }),
      'Hot Topics'
    ),
    description: 'What are you interested in?',
    children: [
      {
        key: '1-1',
        description: `What's new in X?`,
      },
      {
        key: '1-2',
        description: `What's AGI?`,
      },
      {
        key: '1-3',
        description: `Where is the doc?`,
      },
    ],
  },
  {
    key: '2',
    label: renderTitle(
      h(ReadOutlined, { style: { color: '#1890FF' } }),
      'Design Guide'
    ),
    description: 'How to design a good product?',
    children: [
      {
        key: '2-1',
        icon: h(HeartOutlined),
        description: `Know the well`,
      },
      {
        key: '2-2',
        icon: h(SmileOutlined),
        description: `Set the AI role`,
      },
      {
        key: '2-3',
        icon: h(CommentOutlined),
        description: `Express the feeling`,
      },
    ],
  },
]

/**
 * 发送器提示词配置
 * 用于输入框下方的快速提示词
 */
export const senderPromptsItems = [
  {
    key: '1',
    description: '热门话题',
    icon: h(FireOutlined, { style: { color: '#FF4D4F' } }),
  },
  {
    key: '2',
    description: '设计指南',
    icon: h(ReadOutlined, { style: { color: '#1890FF' } }),
  },
]

/**
 * 获取提示词配置
 * @param {string} type - 提示词类型 ('placeholder' | 'sender')
 * @returns {Array} 提示词配置数组
 */
export function getPromptsByType(type) {
  const promptsMap = {
    placeholder: placeholderPromptsItems,
    sender: senderPromptsItems
  }

  return promptsMap[type] || []
}
