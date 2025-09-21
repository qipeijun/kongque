<template>
    <div>
        <a-modal v-model:visible="state.visible" title="文档编辑" width="100%" :footer="null" wrap-class-name="file-edit-full-modal">
            <!--            <TencentDoc ref="tencentDocRefs"></TencentDoc>-->
            <WpsDoc v-if="state.visible" ref="wpsDocRefs" :config="state.data"></WpsDoc>
        </a-modal>
    </div>
</template>
<script setup>
import {reactive, defineExpose, ref, nextTick} from "vue";
import TencentDoc from '../TencentDoc/index.vue'
import WpsDoc from '../WPSDoc/index.vue'

const state = reactive({
    visible: false,
    data: {},
})
const tencentDocRefs = ref(null)
const wpsDocRefs = ref(null)

/**
 * 打开编辑
 * @param data
 */
function open(data) {
    state.visible = true
    state.data = data
    if (data){
        setTimeout(() => {
            wpsDocRefs.value.handleWpsOpen()
        }, 300)
    }
}

/**
 * 关闭编辑
 */
function close() {
    state.visible = false
}




defineExpose({
    open,
    close,
})
</script>

<style lang="less">
.file-edit-full-modal {
    .ant-modal {
        max-width: 100%;
        top: 0;
        padding-bottom: 0;
        margin: 0;
    }
    .ant-modal-content {
        display: flex;
        flex-direction: column;
        height: calc(100vh);
    }
    .ant-modal-body {
        flex: 1;
    }
}
</style>
