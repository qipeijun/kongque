<template>
  <div class="top-nav">
    <a-menu
      mode="horizontal"
      :selected-keys="[activeTab]"
      @click="handleMenuClick"
      class="nav-menu"
    >
      <a-menu-item key="server">
        <template #icon>
          <DesktopOutlined />
        </template>
        Server管理
      </a-menu-item>
      <a-menu-item key="gpu">
        <template #icon>
          <ApiOutlined />
        </template>
        GPU管理
      </a-menu-item>
    </a-menu>
    
    <div class="user-section">
      <a-dropdown>
        <a-button type="text" class="user-info">
          <a-avatar :size="32" style="background-color: #1890ff">
            {{ userInfo.name?.charAt(0) || 'A' }}
          </a-avatar>
          <span class="username">{{ userInfo.name || '管理员' }}</span>
          <DownOutlined />
        </a-button>
        <template #overlay>
          <a-menu>
            <!-- <a-menu-item key="profile">
              <template #icon>
                <UserOutlined />
              </template>
              个人信息
            </a-menu-item>
            <a-menu-item key="settings">
              <template #icon>
                <SettingOutlined />
              </template>
              系统设置
            </a-menu-item> -->
            <a-menu-divider />
            <a-menu-item key="logout" @click="handleLogout">
              <template #icon>
                <LogoutOutlined />
              </template>
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Modal, message } from 'ant-design-vue'
import { 
  DesktopOutlined, 
  ApiOutlined, 
  UserOutlined, 
  SettingOutlined, 
  LogoutOutlined, 
  DownOutlined 
} from '@ant-design/icons-vue'
import { user } from '@/utils/common'

const router = useRouter()

// 定义 props
const props = defineProps({
  activeTab: {
    type: String,
    required: true
  }
})

// 定义 emits
const emit = defineEmits(['switch-tab'])

// 用户信息
const userInfo = ref({})

// 获取用户信息
const getUserInfo = () => {
  userInfo.value = user.getUserInfo() || {}
}

// 处理菜单点击
const handleMenuClick = ({ key }) => {
  emit('switch-tab', key)
}

// 处理退出登录
const handleLogout = () => {
  Modal.confirm({
    title: '确认退出',
    content: '您确定要退出登录吗？',
    okText: '确认退出',
    cancelText: '取消',
    okType: 'danger',
    onOk() {
      // 清除用户数据
      user.clearToken()
      user.clearUserInfo()
      user.clearUserCode()
      
      // 显示退出成功消息
      message.success('已安全退出')
      
      // 跳转到登录页
      router.push('/login')
    }
  })
}

// 组件挂载时获取用户信息
onMounted(() => {
  getUserInfo()
})
</script>

<style scoped>
.top-nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 0 24px;
}

.nav-menu {
  flex: 1;
  border-bottom: none;
}

.user-section {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: #f5f5f5;
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .top-nav {
    padding: 0 16px;
  }
  
  .username {
    display: none;
  }
  
  .user-info {
    padding: 8px;
  }
}
</style>
