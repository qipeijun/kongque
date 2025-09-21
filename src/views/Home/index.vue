<template>
    <div class="home-container">
        <!-- 顶部导航栏 -->
        <TopNavigation :active-tab="activeTab" @switch-tab="switchTab"/>

        <!-- 内容区域 -->
        <div class="content-area">
            <!-- 统计卡片区域 -->
            <a-row :gutter="[16, 16]" class="stats-section">
                <a-col :xs="24" :sm="12" :md="6">
                    <a-card class="stat-card">
                        <a-statistic
                            title="服务器总数"
                            :value="serverStats.total"
                            :value-style="{ color: '#1890ff' }"
                        >
                            <template #prefix>
                                <DesktopOutlined/>
                            </template>
                            <template #suffix>
                                <a-tag color="green">{{ serverStats.running }} 运行中</a-tag>
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>

                <a-col :xs="24" :sm="12" :md="6">
                    <a-card class="stat-card">
                        <a-statistic
                            title="GPU总数"
                            :value="gpuStats.total"
                            :value-style="{ color: '#722ed1' }"
                        >
                            <template #prefix>
                                <ApiOutlined/>
                            </template>
                            <template #suffix>
                                <a-tag color="blue">{{ gpuStats.active }} 活跃</a-tag>
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>

                <a-col :xs="24" :sm="12" :md="6">
                    <a-card class="stat-card">
                        <a-statistic
                            title="平均利用率"
                            :value="gpuStats.avgUtilization"
                            suffix="%"
                            :value-style="{ color: '#52c41a' }"
                        >
                            <template #prefix>
                                <DashboardOutlined/>
                            </template>
                            <template #suffix>
                                <a-tag color="default">实时监控</a-tag>
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>

                <a-col :xs="24" :sm="12" :md="6">
                    <a-card class="stat-card">
                        <a-statistic
                            title="系统性能"
                            :value="systemStats.performance"
                            :value-style="{ color: '#fa8c16' }"
                        >
                            <template #prefix>
                                <ThunderboltOutlined/>
                            </template>
                            <template #suffix>
                                <a-tag color="green">优秀</a-tag>
                            </template>
                        </a-statistic>
                    </a-card>
                </a-col>
            </a-row>

            <!-- 页面切换动画容器 -->
            <a-card class="page-container">
                <transition name="page-fade" mode="out-in">
                    <component
                        :is="currentComponent"
                        :key="activeTab"
                    />
                </transition>
            </a-card>
        </div>

        <!-- 全局加载遮罩 -->
        <a-spin v-if="globalLoading" class="global-loading" size="large">
            <div class="loading-content">
                <div class="loading-text">正在切换页面...</div>
            </div>
        </a-spin>
    </div>
</template>

<script setup>
import {ref, onMounted, provide, computed} from 'vue'
import {
    DesktopOutlined,
    ApiOutlined,
    DashboardOutlined,
    ThunderboltOutlined
} from '@ant-design/icons-vue'
import TopNavigation from './components/TopNavigation/index.vue'
import ServerManagement from './components/ServerManagement/index.vue'
import GPUManagement from './components/GPUManagement/index.vue'

// 状态管理
const activeTab = ref('server')
const globalLoading = ref(false)

// 统计数据
const serverStats = ref({
    total: 0,
    running: 0,
    maintenance: 0,
    offline: 0
})

const gpuStats = ref({
    total: 0,
    active: 0,
    avgUtilization: 0,
    highUtilization: 0
})

const systemStats = ref({
    performance: 'A+',
    uptime: '99.9%',
    lastUpdate: '刚刚'
})

// 动态组件选择
const currentComponent = computed(() => {
    return activeTab.value === 'server' ? ServerManagement : GPUManagement
})

// 页面切换处理 - 现代化平滑过渡
const switchTab = (tab) => {
    if (activeTab.value === tab) return

    // 添加切换动画
    globalLoading.value = true

    setTimeout(() => {
        activeTab.value = tab
        // 更新统计数据
        updateStats()
        globalLoading.value = false
    }, 200) // 更流畅的过渡
}

// 从 JSON 数据计算统计数据
const calculateStats = async () => {
    try {
        const response = await fetch('/src/views/Home/mock/data.json')
        const jsonData = await response.json()

        // 计算服务器统计
        const serverData = jsonData.server_resources
        serverStats.value.total = serverData.length
        serverStats.value.running = serverData.filter(s => s.status === '运行中').length
        serverStats.value.maintenance = serverData.filter(s => s.status === '维护中').length
        serverStats.value.offline = serverData.filter(s => s.status === '离线').length

        // 计算GPU统计
        const gpuData = jsonData.gpu_resources
        gpuStats.value.total = gpuData.length
        gpuStats.value.active = gpuData.filter(g => g.persistence_mode === 'On').length

        // 计算平均利用率
        const utilizations = gpuData.map(g => parseInt(g.gpu_utilization))
        gpuStats.value.avgUtilization = Math.round(utilizations.reduce((sum, util) => sum + util, 0) / utilizations.length)

        // 计算高利用率GPU数量
        gpuStats.value.highUtilization = gpuData.filter(g => parseInt(g.gpu_utilization) > 70).length

        systemStats.value.lastUpdate = '刚刚'
    } catch (error) {
        console.error('计算统计数据失败:', error)
    }
}

// 更新统计数据
const updateStats = () => {
    calculateStats()
}

// 向子组件提供全局状态
provide('globalLoading', globalLoading)

// 组件挂载时的初始化
onMounted(() => {
    // 加载统计数据
    calculateStats()
    console.log('Home page mounted - Data loaded from JSON')
})
</script>

<style scoped>
.home-container {
    min-height: 100vh;
    background: #f0f2f5;
}

.content-area {
    padding: 24px;
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
    height: auto;
}

.stats-section {
    margin-bottom: 24px;
}

.stat-card {
    height: 100%;
}

.page-container {
    min-height: 600px;
}

/* 页面切换动画 */
.page-fade-enter-active,
.page-fade-leave-active {
    transition: opacity 0.3s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
    opacity: 0;
}

/* 全局加载遮罩 */
.global-loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.loading-content {
    text-align: center;
}

.loading-text {
    margin-top: 16px;
    color: #666;
}

/* 响应式设计 */
@media (max-width: 1200px) {
    .content-area {
        max-width: 100%;
        padding: 20px;
    }
}

@media (max-width: 768px) {
    .content-area {
        padding: 16px;
    }
}

@media (max-width: 480px) {
    .content-area {
        padding: 12px;
    }
}
</style>
