import { createRouter, createWebHistory } from 'vue-router'
import { user } from '@/utils/common'
import { message } from 'ant-design-vue'

const HomePage = () => import('@/views/Home/index.vue')
const LoginPage = () => import('@/views/Login/index.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,
        meta: {
            requiresAuth: true, // 需要登录
            title: '服务器资源管理'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: {
            requiresAuth: false, // 不需要登录
            title: '用户登录'
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    // 设置页面标题
    if (to.meta.title) {
        document.title = `${to.meta.title} - ServerManager`
    }

    // 获取登录状态
    const token = user.getToken()
    const userInfo = user.getUserInfo()
    const isLoggedIn = !!(token && userInfo && userInfo.id)

    // 需要登录的页面
    if (to.meta.requiresAuth) {
        if (isLoggedIn) {
            // 已登录，允许访问
            next()
        } else {
            // 未登录，跳转到登录页
            message.warning('请先登录')
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 保存原始路径，登录后可以跳转回来
            })
        }
    } else {
        // 不需要登录的页面（如登录页）
        if (to.path === '/login' && isLoggedIn) {
            // 已登录用户访问登录页，跳转到首页
            message.info('您已登录，正在跳转到首页')
            next('/')
        } else {
            // 允许访问
            next()
        }
    }
})

// 路由错误处理
router.onError((error) => {
    console.error('路由错误:', error)
    message.error('页面加载失败，请刷新重试')
})

export default router
