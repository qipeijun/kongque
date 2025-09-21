
<template>
    <div id="wps-office-container"></div>
</template>

<script setup>
/**
 * wps开放平台
 */
import {ref, onMounted, onBeforeUnmount, defineExpose, defineProps, nextTick} from "vue";
import WebOfficeSDK from '../../assets/lib/web-office-sdk-solution-v2.0.7/web-office-sdk-solution-v2.0.7.es'
import {user} from "../../utils/common";

const props = defineProps({
    config: {
        type: Object,
        required: true,
    }
})

let instance = null  // wps实例

let fileOpenLoading = ref(null)

const OfficeTypeMap = {
    Spreadsheet: 's',
    Writer: 'w',
    Presentation: 'p',
    Pdf: 'f',
    Otl: 'o',
    Dbt: 'd',
    KSheet: 'k',
}

function convertOfficeType(type) {
    const result = OfficeTypeMap[type]
    if (!result) {
        console.warn(`[officeType] 未知类型: ${type}`)
        return 'w' // 默认值
    }
    return result
}



function handleWpsOpen() {
    fileOpenLoading.value = true
    nextTick(()=>{
        instance = WebOfficeSDK.init({
            appId: props.config.appId,
            officeType: convertOfficeType(props.config.officeType),
            // officeType: 'w',
            fileId: props.config.fileId,
            token:user.getToken(),
            mode: 'normal', // 可选 simple | normal 模式
            mount: document.getElementById('wps-office-container'),
            wordOptions:{
                isShowDocMap:true, // 显示文档目录
                isBestScale: true, // 适配屏幕,最佳比例
            }
        })
        instance.ApiEvent.AddApiEventListener('fileOpen', data => {
            console.log('fileOpen: ', data)
            fileOpenLoading.value = false
        })
    })
}

function handleWpsClose() {
    instance?.destroy?.()
}

defineExpose({
    handleWpsOpen,
    handleWpsClose,
})

onBeforeUnmount(()=>{
    handleWpsClose()
})
</script>

<style scoped lang="less">

#wps-office-container{
    height: 100%;
    width: 100%;
}

</style>
