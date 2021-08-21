import { createWebHashHistory, createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout.vue'
import Home from '../views/home.vue'
import store from '../store/index'
const routes = [
    {
        path: '/',
        name: '首页',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home
            },
            {
                path: '/user',
                name: '用户列表',
                component: () => import('../views/userList.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login.vue')
    }
]
const router = createRouter({
    // history: createWebHashHistory(), // hash mode
    history: createWebHistory(), // history mode
    routes
})
router.beforeEach((to, from, next) => {
    store.dispatch('setBreadcrumb', to)
    next()
})
export default router