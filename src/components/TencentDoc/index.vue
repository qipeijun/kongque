<template>
    <div class="tx-doc" ref="docContainer"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref,reactive } from 'vue'

const state = reactive({
    appId: String,
    signature: Object, // { sign, nonce, timeStamp }
    officeType: {
        type: String,
        default: 'doc' // 可选：sheet, slide, pdf
    },
    fileId: String
})

const docContainer = ref(null)
let instance = null

onMounted(() => {
    if (!window.TencentDocsSDK) {
        console.error('腾讯文档 SDK 未加载')
        return
    }

    instance = window.TencentDocsSDK.init({
        // appId: state.appId,
        // signature: state.signature,
        // officeType: state.officeType,
        // fileId: state.fileId,
        // mode: 'normal', // 可选 simple 模式
        // mount: docContainer.value,  // 挂载容器

        // ==== demo 示例 参数 ====
        appId: "6710bdab4b6d447695528a7d1e868e45",
        fileId: "40c54279e10f4f339025fa65d97bc6f3",
        fileToken: "weboffice-demo-token",
        officeType: "pdf",
        mode: "simple",
        commonOptions: {
            "isShowTitleBar": true,
            "isShowToolBar": true
        },
        mount: docContainer.value,  // 挂载容器

    })

    instance.on('ready', () => {
        console.log('文档加载完成')
    })

    instance.on('change', () => {
        console.log('文档内容或光标发生变动');
    });

    instance.on('focus', () => {
        console.log('文档获得焦点')
    });

    instance.on('error', (err) => {
        console.error('文档加载失败', err)
    })
})

onBeforeUnmount(() => {
    instance?.destroy?.()
})
</script>

<style scoped lang="less">
.tx-doc {
    width: 100%;
    height: 100%;
}
</style>
