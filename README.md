# Vue Chat App


## 🛠️ 技术栈

- **Vue 3** - 渐进式JavaScript框架
- **Ant Design Vue** - 企业级UI组件库
- **Ant Design X Vue** - AI产品界面解决方案
- **Vite** - 下一代前端构建工具

## 🎯 核心模块

### 1. 主题管理 (`useTheme.js`)
- 提供响应式主题样式
- 支持动态主题切换
- 统一的样式配置管理

### 2. 聊天功能 (`useChat.js`)
- AI代理管理
- 消息状态管理
- 错误处理和重试机制

### 3. 会话管理 (`useConversations.js`)
- 会话列表状态管理
- 会话切换逻辑
- 会话增删改操作

### 4. 组件架构
- **ChatSidebar** - 侧边栏，包含Logo和会话列表
- **ChatWindow** - 主聊天区域，包含消息列表和输入框

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 📝 代码规范

### 组件规范
- 使用 Composition API
- 添加详细的 JSDoc 注释
- 统一的 Props 和 Emits 定义
- 完善的错误处理

### 状态管理
- 使用 composables 分离业务逻辑
- 响应式状态管理
- 清晰的数据流向

### 样式管理
- 基于 Ant Design 设计系统
- 响应式布局
- 统一的主题配置

## 🔧 开发指南

### 添加新功能
1. 在 `composables/` 中创建对应的逻辑
2. 在 `components/` 中创建UI组件
3. 在 `App.vue` 中整合功能

### 样式定制
1. 修改 `useTheme.js` 中的样式配置
2. 使用 Ant Design 的设计令牌
3. 保持响应式布局

### 错误处理
- 所有异步操作都包含 try-catch
- 统一的错误日志格式
- 用户友好的错误提示
