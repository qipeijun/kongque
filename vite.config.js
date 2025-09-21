import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const dependencies = require('./package.json').dependencies;

// 1. 获取当前时间并格式化
const getTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
const timestamp = getTimestamp();

export default defineConfig({
    // 打包配置
    build: {
        outDir: 'server-admin',
        assetsDir: 'static',
        brotliSize: false, // 设置为false将禁用构建的brotli压缩大小报告。可以稍微提高构建速度
        minify: true, // 开启压缩
        cssCodeSplit: true, // 开启css代码拆分
        emptyOutDir: true, // 清空输出目录
        rollupOptions: {
            treeshake: true, // 开启 Tree Shaking，消除未使用的代码，减小最终的包大小
            output: {
                // 2. 在输出文件名中应用时间戳
                // JS入口文件
                entryFileNames: `static/js/[name]-[hash]-${timestamp}.js`,
                // JS代码分割文件
                chunkFileNames: `static/js/[name]-[hash]-${timestamp}.js`,
                // 静态资源文件（如css, 图片等）
                assetFileNames: `static/[ext]/[name]-[hash]-${timestamp}.[ext]`,

                // 根据不同的js库 拆分包，减小index.js包体积
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        // 指定需要拆分的第三方库或模块
                        console.info('id', id)
                        const dependenciesKeys = Object.keys(dependencies);
                        const match = dependenciesKeys.find((item) => {
                            return id.includes(item);
                        });
                        console.info('match', match)
                        const notSplit = ['vue', 'ant-design-vue'];
                        if (match && !notSplit.includes(match)) {
                            return match;
                        }
                    }
                },
            },
            commonjsOptions: {
                requireReturnsDefault: 'namespace', // 要求ES模块返回其名称空
            }
        },
    },
    plugins: [vue()],
    resolve: {
        alias: {
            '@': '/src'
        }
    },

    esbuild: {
        target: 'es2020'
    },

    server:{
        host: true,
        port: 3000,
        cors: true,
        open: true,
        proxy: {
            '/api': {
                // target: 'http://192.168.11.106:12301',
                target: 'https://server-admin.szyh-smart.cn',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
        }
    }
})
