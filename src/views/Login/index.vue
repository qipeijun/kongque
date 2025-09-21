<template>
    <div class="login-container">
        <!-- 服务器主题背景 -->
        <ServerBackground/>

        <div class="login-card">
            <!-- 左侧功能介绍面板 -->
            <div class="left-panel">
                <!-- 动态背景元素 -->
                <div class="dynamic-bg">
                    <div class="floating-shapes">
                        <div class="shape shape-1"></div>
                        <div class="shape shape-2"></div>
                        <div class="shape shape-3"></div>
                        <div class="shape shape-4"></div>
                        <div class="shape shape-5"></div>
                        <div class="shape shape-6"></div>
                    </div>
                    <div class="light-effects">
                        <div class="light-beam light-1"></div>
                        <div class="light-beam light-2"></div>
                        <div class="light-beam light-3"></div>
                    </div>
                    <div class="gradient-overlay"></div>
                </div>

                <div class="panel-content">
                    <div class="header">
                        <h1 class="title">ServerManager</h1>
                        <div class="menu-icon">☰</div>
                    </div>

                    <div class="features">
                        <div class="feature-item">
                            <div class="feature-icon">🛡️</div>
                            <div class="feature-content">
                                <h3>安全可靠</h3>
                                <p>企业级安全防护,保障服务器资源安全</p>
                            </div>
                        </div>

                        <div class="feature-item">
                            <div class="feature-icon">👁️</div>
                            <div class="feature-content">
                                <h3>实时监控</h3>
                                <p>全方位监控服务器性能与资源使用情况</p>
                            </div>
                        </div>

                        <div class="feature-item">
                            <div class="feature-icon">⚙️⭐</div>
                            <div class="feature-content">
                                <h3>智能管理</h3>
                                <p>自动化资源分配与优化,提升运行效率</p>
                            </div>
                        </div>
                    </div>

                    <div class="server-image">
                        <div class="server-racks">
                            <div class="rack"></div>
                            <div class="rack"></div>
                            <div class="rack"></div>
                            <div class="lights"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 右侧登录表单 -->
            <div class="right-panel">
                <div class="form-content">
                    <a-typography-title :level="2" class="form-title">欢迎登录</a-typography-title>
                    <a-typography-text type="secondary" class="form-subtitle">
                        请输入您的账号和密码以访问服务器资源管理系统
                    </a-typography-text>

                    <a-form
                        :model="form"
                        :rules="rules"
                        @finish="handleLogin"
                        class="login-form"
                        layout="vertical"
                    >
                        <a-form-item name="username" label="用户名">
                            <a-input
                                v-model:value="form.username"
                                placeholder="请输入用户名"
                                size="large"
                                :prefix="h(UserOutlined)"
                            />
                        </a-form-item>

                        <a-form-item name="password" label="密码">
                            <a-input-password
                                v-model:value="form.password"
                                placeholder="请输入密码"
                                size="large"
                                :prefix="h(LockOutlined)"
                            />
                            <!-- <a-typography-link class="forgot-password" @click="handleForgotPassword">
                              忘记密码?
                            </a-typography-link> -->
                        </a-form-item>

                        <a-form-item>
                            <a-checkbox v-model:checked="form.rememberMe">
                                记住我
                            </a-checkbox>
                        </a-form-item>

                        <a-form-item>
                            <a-button
                                type="primary"
                                html-type="submit"
                                size="large"
                                :loading="loading"
                                :disabled="!isFormValid"
                                block
                                class="login-btn"
                            >
                                登录
                                <template #icon>
                                    <RightOutlined/>
                                </template>
                            </a-button>
                        </a-form-item>
                    </a-form>

                    <div class="footer-bars">
                        <div class="bar bar-1"></div>
                        <div class="bar bar-2"></div>
                        <div class="bar bar-3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, computed, h} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {message, Modal} from 'ant-design-vue'
import {UserOutlined, LockOutlined, RightOutlined} from '@ant-design/icons-vue'
import {user} from '@/utils/common'
import ServerBackground from '@/components/ServerBackground/index.vue'

const router = useRouter()
const route = useRoute()

// 表单数据
const form = ref({
    username: '',
    password: '',
    rememberMe: false
})

const loading = ref(false)

// 表单验证规则
const rules = {
    username: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur'}
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur'}
    ]
}

// 表单验证状态
const isFormValid = computed(() => {
    return form.value.username.trim() && form.value.password.trim()
})

// 登录处理
const handleLogin = async (values) => {
    loading.value = true

    try {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 1000))

        const {username, password, rememberMe} = form.value

        // 验证账号密码
        if (username === 'admin' && password === '#Aa123456') {
            // 生成模拟token
            const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

            // 保存用户信息
            const userInfo = {
                id: '1',
                username: 'admin',
                name: '管理员',
                email: 'admin@servermanager.com',
                role: 'admin',
                avatar: '',
                loginTime: new Date().toISOString()
            }

            // 保存到缓存
            user.setToken(token)
            user.setUserInfo(userInfo)

            // 如果选择记住我，保存用户名
            if (rememberMe) {
                user.setUserCode(username)
            } else {
                user.clearUserCode()
            }

            // 显示成功消息
            message.success('登录成功！')

            // 跳转到原始页面或主页面
            const redirectPath = route.query.redirect || '/'
            router.push(redirectPath)
        } else {
            // 显示错误消息
            message.error('用户名或密码错误！')
        }
    } catch (error) {
        message.error('登录失败，请稍后重试')
        console.error('登录错误:', error)
    } finally {
        loading.value = false
    }
}

// 忘记密码处理
const handleForgotPassword = () => {
    Modal.info({
        title: '忘记密码',
        content: '请联系系统管理员重置密码，或使用默认账号：admin / #Aa123456',
        okText: '知道了'
    })
}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
}

.login-card {
    display: flex;
    width: 100%;
    max-width: 1000px;
    height: 600px;
    backdrop-filter: blur(10px);
    border: 1px dashed rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
    z-index: 100;
}

/* 左侧面板 */
.left-panel {
    flex: 1;
    color: white;
    position: relative;
    overflow: hidden;
}

/* 动态背景 */
.dynamic-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    overflow: hidden;
}

/* 浮动几何图形 */
.floating-shapes {
    position: absolute;
    width: 100%;
    height: 100%;
}

.shape {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    animation: float 6s ease-in-out infinite;
}

.shape-1 {
    width: 60px;
    height: 60px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
    animation-duration: 8s;
}

.shape-2 {
    width: 40px;
    height: 40px;
    top: 60%;
    left: 80%;
    animation-delay: 2s;
    animation-duration: 6s;
}

.shape-3 {
    width: 80px;
    height: 80px;
    top: 40%;
    left: 70%;
    animation-delay: 4s;
    animation-duration: 10s;
}

.shape-4 {
    width: 30px;
    height: 30px;
    top: 80%;
    left: 20%;
    animation-delay: 1s;
    animation-duration: 7s;
}

.shape-5 {
    width: 50px;
    height: 50px;
    top: 10%;
    left: 60%;
    animation-delay: 3s;
    animation-duration: 9s;
}

.shape-6 {
    width: 35px;
    height: 35px;
    top: 70%;
    left: 40%;
    animation-delay: 5s;
    animation-duration: 5s;
}

/* 光效 */
.light-effects {
    position: absolute;
    width: 100%;
    height: 100%;
}

.light-beam {
    position: absolute;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: lightFlow 4s ease-in-out infinite;
}

.light-1 {
    width: 200px;
    height: 2px;
    top: 30%;
    left: -200px;
    animation-delay: 0s;
    animation-duration: 6s;
}

.light-2 {
    width: 150px;
    height: 2px;
    top: 60%;
    right: -150px;
    animation-delay: 2s;
    animation-duration: 5s;
    transform: rotate(45deg);
}

.light-3 {
    width: 180px;
    height: 2px;
    top: 80%;
    left: -180px;
    animation-delay: 4s;
    animation-duration: 7s;
    transform: rotate(-30deg);
}

/* 渐变叠加层 */
.gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg,
    rgba(102, 126, 234, 0.3) 0%,
    rgba(118, 75, 162, 0.3) 50%,
    rgba(102, 126, 234, 0.3) 100%);
    animation: gradientShift 8s ease-in-out infinite;
}

/* 动画定义 */
@keyframes float {
    0%, 100% {
        transform: translateY(0px) rotate(0deg);
        opacity: 0.7;
    }
    25% {
        transform: translateY(-20px) rotate(90deg);
        opacity: 1;
    }
    50% {
        transform: translateY(-10px) rotate(180deg);
        opacity: 0.8;
    }
    75% {
        transform: translateY(-30px) rotate(270deg);
        opacity: 0.9;
    }
}

@keyframes lightFlow {
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: translateX(100px);
        opacity: 0;
    }
}

@keyframes gradientShift {
    0%, 100% {
        background: linear-gradient(45deg,
        rgba(102, 126, 234, 0.3) 0%,
        rgba(118, 75, 162, 0.3) 50%,
        rgba(102, 126, 234, 0.3) 100%);
    }
    50% {
        background: linear-gradient(45deg,
        rgba(118, 75, 162, 0.3) 0%,
        rgba(102, 126, 234, 0.3) 50%,
        rgba(118, 75, 162, 0.3) 100%);
    }
}


.panel-content {
    padding: 40px;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
}

.title {
    font-size: 28px;
    font-weight: bold;
    margin: 0;
}

.menu-icon {
    font-size: 20px;
    cursor: pointer;
}

.features {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.feature-item {
    display: flex;
    align-items: flex-start;
    gap: 15px;
}

.feature-icon {
    font-size: 24px;
    margin-top: 5px;
}

.feature-content h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 600;
}

.feature-content p {
    margin: 0;
    font-size: 14px;
    opacity: 0.9;
    line-height: 1.4;
}

.server-image {
    margin-top: auto;
    height: 120px;
    position: relative;
}

.server-racks {
    position: relative;
    width: 100%;
    height: 100%;
    background: #1a1a2e;
    border-radius: 10px;
    overflow: hidden;
}

.rack {
    position: absolute;
    width: 20px;
    height: 80px;
    background: #16213e;
    border-radius: 2px;
}

.rack:nth-child(1) {
    left: 20px;
    top: 20px;
}

.rack:nth-child(2) {
    left: 50px;
    top: 15px;
}

.rack:nth-child(3) {
    left: 80px;
    top: 25px;
}

.lights {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg,
    transparent 30%,
    rgba(0, 255, 255, 0.3) 50%,
    transparent 70%);
    animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
    from {
        opacity: 0.3;
    }
    to {
        opacity: 0.7;
    }
}

/* 右侧面板 */
.right-panel {
    flex: 1;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-content {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    backdrop-filter: blur(10px);
}

.form-title {
    margin-bottom: 8px !important;
}

.form-subtitle {
    margin-bottom: 32px !important;
}

.login-form {
    margin-top: 24px;
}

.forgot-password {
    float: right;
    margin-top: 8px;
    font-size: 12px;
}

.login-btn {
    height: 48px;
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
}

.footer-bars {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 40px;
}

.bar {
    width: 30px;
    height: 4px;
    border-radius: 2px;
}

.bar-1 {
    background: #e1e5e9;
}

.bar-2 {
    background: #667eea;
}

.bar-3 {
    background: #764ba2;
}

:deep(.ant-input) {
    background: transparent !important;
}

:deep(.ant-input-affix-wrapper) {
    background: transparent !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .login-card {
        flex-direction: column;
        height: auto;
        max-width: 400px;
    }

    .left-panel {
        min-height: 300px;
    }

    .panel-content {
        padding: 30px;
    }

    .features {
        gap: 20px;
    }

    .server-image {
        height: 80px;
    }

    .form-content {
        padding: 30px;
    }

    .form-title {
        font-size: 24px;
    }
}
</style>
