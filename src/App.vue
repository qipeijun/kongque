<template>
    <a-config-provider :locale="locale">
        <router-view />
    </a-config-provider>
</template>
<script setup >
import { ref, onMounted, computed } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';  // 配置ui库 中文显示

const locale = ref(zhCN)

</script>
