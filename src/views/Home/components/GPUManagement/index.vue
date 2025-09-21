<template>
    <div class="page-content">
        <div class="page-header">
            <a-row justify="space-between" align="top">
                <a-col>
                    <a-typography-title :level="3">
                        <ApiOutlined style="margin-right: 8px; color: #722ed1;"/>
                        GPU资源管理
                    </a-typography-title>
                    <a-typography-text type="secondary">
                        监控和管理所有GPU设备运行状态
                    </a-typography-text>
                </a-col>
                <a-col>
                    <a-button
                        type="primary"
                        :loading="loading"
                        @click="fetchGPUData"
                        :icon="h(ReloadOutlined)"
                    >
                        刷新数据
                    </a-button>
                </a-col>
            </a-row>
        </div>

        <a-table
            :columns="columns"
            :data-source="gpuData"
            :loading="loading"
            :pagination="false"
            :scroll="{ x: 1500 }"
            class="gpu-table"
        >
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'index'">
                    <a-tag color="purple">{{ record.index }}</a-tag>
                </template>
                <template v-else-if="column.key === 'name'">
                    <div style="font-weight: 500;">{{ record.name }}</div>
                </template>
                <template v-else-if="column.key === 'busId'">
                    <a-typography-text code>{{ record.busId }}</a-typography-text>
                </template>
                <template v-else-if="column.key === 'gpuUtil'">
                    <a-progress
                        :percent="parseInt(record.gpuUtil)"
                        :show-info="false"
                        size="small"
                        :stroke-color="getUtilizationColor(parseInt(record.gpuUtil))"
                    />
                    <span style="margin-left: 8px;">{{ record.gpuUtil }}</span>
                </template>
                <template v-else-if="column.key === 'persistence'">
                    <a-tag :color="record.persistence === 'On' ? 'green' : 'red'">
                        {{ record.persistence }}
                    </a-tag>
                </template>
                <template v-else-if="column.key === 'displayActive'">
                    <a-tag :color="record.displayActive === 'off' ? 'default' : 'blue'">
                        {{ record.displayActive }}
                    </a-tag>
                </template>
                <template v-else-if="column.key === 'memoryUsage'">
                    <a-typography-text type="secondary">{{ record.memoryUsage }}</a-typography-text>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script setup>
import {ref, onMounted, h} from 'vue'
import {message} from 'ant-design-vue'
import {ReloadOutlined, ApiOutlined} from '@ant-design/icons-vue'

// 表格列配置
const columns = ref([
    {
        title: 'GPU',
        dataIndex: 'index',
        key: 'index',
        width: 80,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 250,
    },
    {
        title: 'Persistence-M',
        dataIndex: 'persistence',
        key: 'persistence',
        width: 140,
    },
    {
        title: 'Bus-Id',
        dataIndex: 'busId',
        key: 'busId',
        width: 180,
    },
    {
        title: 'Disp.A',
        dataIndex: 'displayActive',
        key: 'displayActive',
        width: 100,
    },
    {
        title: 'Memory-Usage',
        dataIndex: 'memoryUsage',
        key: 'memoryUsage',
        width: 180,
    },
    {
        title: 'GPU-Util',
        dataIndex: 'gpuUtil',
        key: 'gpuUtil',
        width: 150,
    },
    {
        title: 'Compute M.',
        dataIndex: 'computeMode',
        key: 'computeMode',
        width: 120,
    },
    {
        title: 'MIG M.',
        dataIndex: 'migMode',
        key: 'migMode',
        width: 120,
    },
])

const gpuData = ref([])
const loading = ref(false)

// 获取GPU数据
const fetchGPUData = async () => {
    loading.value = true
    try {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 800))

        // 从 JSON 文件导入数据
        const response = await fetch('/mock/data.json')
        const jsonData = await response.json()

        // 转换数据格式以匹配表格列
        const transformedData = jsonData.gpu_resources.map((item) => ({
            index: item.gpu_id,
            name: item.name,
            persistence: item.persistence_mode,
            busId: item.bus_id,
            displayActive: item.display_active,
            memoryUsage: item.memory_usage,
            gpuUtil: item.gpu_utilization,
            computeMode: item.compute_mode,
            migMode: item.mig_mode
        }))

        gpuData.value = transformedData
        message.success('GPU数据更新成功')
    } catch (error) {
        message.error('获取GPU数据失败')
        console.error('GPU数据获取错误:', error)
    } finally {
        loading.value = false
    }
}

// 获取利用率颜色
const getUtilizationColor = (percent) => {
    if (percent < 30) return '#52c41a'
    if (percent < 70) return '#faad14'
    return '#ff4d4f'
}

// 组件挂载时获取数据
onMounted(() => {
    fetchGPUData()
})
</script>

<style scoped>
.page-content {
    width: 100%;
}

.page-header {
    margin-bottom: 24px;
}

.gpu-table {
    width: 100%;
}
</style>
