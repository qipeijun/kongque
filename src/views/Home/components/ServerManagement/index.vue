<template>
  <div class="page-content">
    <div class="page-header">
      <a-row justify="space-between" align="top">
        <a-col>
          <a-typography-title :level="3">
            <DesktopOutlined style="margin-right: 8px; color: #1890ff;" />
            Server资源管理
          </a-typography-title>
          <a-typography-text type="secondary">
            监控和管理所有Server设备运行状态
          </a-typography-text>
        </a-col>
        <a-col>
          <a-button 
            type="primary" 
            :loading="loading"
            @click="fetchServerData"
            :icon="h(ReloadOutlined)"
          >
            刷新数据
          </a-button>
        </a-col>
      </a-row>
    </div>
    
    <a-table
      :columns="columns"
      :data-source="serverData"
      :loading="loading"
      :pagination="false"
      :scroll="{ x: 1000 }"
      class="server-table"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'gpuId'">
          <a-space>
            <DesktopOutlined style="color: #1890ff" />
            <span>{{ record.gpuId }}</span>
          </a-space>
        </template>
        <template v-else-if="column.key === 'server'">
          <div>
            <div style="font-weight: 500; margin-bottom: 4px;">{{ record.name }}</div>
            <div style="font-size: 12px; color: #8c8c8c;">ID: {{ record.id }}</div>
          </div>
        </template>
        <template v-else-if="column.key === 'status'">
          <a-tag :color="getStatusColor(record.status)">
            {{ record.status }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'memory'">
          <a-progress 
            :percent="getMemoryPercent(record.memory)" 
            :show-info="false" 
            size="small"
            :stroke-color="getMemoryColor(getMemoryPercent(record.memory))"
          />
          <span style="margin-left: 8px; font-size: 12px;">{{ record.memory }}</span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import { DesktopOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

// 表格列配置
const columns = ref([
  {
    title: 'GPU ID',
    dataIndex: 'gpuId',
    key: 'gpuId',
    width: 150,
  },
  {
    title: '服务器',
    dataIndex: 'server',
    key: 'server',
    width: 200,
  },
  {
    title: 'CPU 型号',
    dataIndex: 'cpuModel',
    key: 'cpuModel',
    width: 150,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 120,
  },
  {
    title: '内存',
    dataIndex: 'memory',
    key: 'memory',
    width: 150,
  },
  {
    title: '存储',
    dataIndex: 'storage',
    key: 'storage',
    width: 250,
  },
])

const serverData = ref([])
const loading = ref(false)

// 获取服务器数据
const fetchServerData = async () => {
  loading.value = true
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 从 JSON 文件导入数据
    const response = await fetch('/src/views/Home/mock/data.json')
    const jsonData = await response.json()
    
    // 生成随机内存使用量的函数
    const generateRandomMemory = () => {
      // 总内存固定为 1024GB
      const totalMemory = 1024
      // 生成 800-1000GB 之间的随机已用内存（不超过总内存）
      const usedMemory = Math.floor(Math.random() * 201) + 800
      return `${usedMemory}GB / ${totalMemory}GB`
    }

    // 转换数据格式以匹配表格列
    const transformedData = jsonData.server_resources.map((item, index) => ({
      id: item.server.id,
      gpuId: item.gpu_id,
      name: item.server.name,
      cpuModel: item.cpu_model,
      status: item.status,
      memory: generateRandomMemory(),
      storage: item.storage
    }))

    serverData.value = transformedData
    message.success('服务器数据更新成功')
  } catch (error) {
    message.error('获取服务器数据失败')
    console.error('服务器数据获取错误:', error)
  } finally {
    loading.value = false
  }
}

// 获取状态颜色
const getStatusColor = (status) => {
  const colorMap = {
    '运行中': 'green',
    '维护中': 'orange',
    '离线': 'red'
  }
  return colorMap[status] || 'default'
}

// 获取内存使用百分比
const getMemoryPercent = (memory) => {
  // 解析 "已用GB / 总GB" 格式
  const match = memory.match(/(\d+)GB \/ (\d+)GB/)
  if (match) {
    const used = parseInt(match[1])
    const total = parseInt(match[2])
    return Math.min((used / total) * 100, 100)
  }
  return 0
}

// 获取内存进度条颜色
const getMemoryColor = (percent) => {
  if (percent < 50) return '#52c41a'
  if (percent < 80) return '#faad14'
  return '#ff4d4f'
}

// 组件挂载时获取数据
onMounted(() => {
  fetchServerData()
})
</script>

<style scoped>
.page-content {
  width: 100%;
}

.page-header {
  margin-bottom: 24px;
}

.server-table {
  width: 100%;
}
</style>
