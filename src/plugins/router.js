import {createRouter, createWebHistory} from 'vue-router'

import user from './stores/user'
import app from '../config/app'

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/Index.vue'),
        meta: {
            auth: false,
            keepalive: true,
            title: '欢迎',
        },
    },
    {
        path: '/auth/login',
        name: 'auth.login',
        meta: {
            auth: false,
            title: '登录',
            collapses: ['left'],
        },
        component: () => import('../views/users/Login.vue'),
    },
    {
        path: '/status',
        name: 'status',
        meta: {
            title: '状态',
        },
        component: () => import('../views/Status.vue'),
    },
    {
        path: '/work-orders',
        name: 'work-orders',
        component: () => import('../views/work-orders/Index.vue'),
        meta: {
            auth: true,
            title: '工单',
        },
    },
    {
        path: '/work-orders/create',
        name: 'work-orders.create',
        component: () => import('../views/work-orders/Create.vue'),
        meta: {
            title: '创建工单',
            auth: false,
        },
    },
    {
        path: '/work-orders/:id',
        name: 'work-orders.show',
        component: () => import('../views/work-orders/Show.vue'),
        meta: {
            title: '跟进工单',
            auth: false,
        },
    },
    // Modules
    {
        path: '/modules',
        name: 'modules',
        props: true,
        component: () => import('../views/modules/Base.vue'),
        meta: {
            auth: true,
        },
        children: [
            {
                path: 'tunnels',
                // name: 'modules.tunnels',
                component: () => import('../views/modules/tunnels/Base.vue'),
                meta: {
                    title: 'PortIO',
                },
                children: [
                    {
                        path: '',
                        name: 'modules.tunnels.index',
                        component: () => import('../views/modules/tunnels/Index.vue'),
                        meta: {
                            title: '隧道列表',
                        },
                    },
                    {
                        path: 'sponsor',
                        name: 'modules.tunnels.sponsor',
                        component: () => import('../views/modules/tunnels/Sponsor.vue'),
                        meta: {
                            title: '赞助列表',
                        },
                    },
                    {
                        path: 'sign',
                        name: 'modules.tunnels.sign',
                        component: () => import('../views/modules/tunnels/Sign.vue'),
                        meta: {
                            title: '流量补给',
                        },
                    },
                    {
                        path: 'create',
                        name: 'modules.tunnels.create',
                        component: () => import('../views/modules/tunnels/Create.vue'),
                        meta: {
                            title: '创建隧道',
                        },
                    },
                    {
                        path: 'concat',
                        name: 'modules.tunnels.concat',
                        component: () => import('../views/modules/tunnels/Concat.vue'),
                        meta: {
                            title: '配置文件',
                        },
                    },
                    {
                        path: 'status',
                        name: 'modules.tunnels.status',
                        component: () => import('../views/modules/tunnels/Status.vue'),
                        meta: {
                            title: '服务器状态',
                        },
                    },
                    {
                        path: ':id',
                        name: 'modules.tunnels.show',
                        component: () => import('../views/modules/tunnels/Show.vue'),
                        meta: {
                            // collapses: ['left'],
                            title: '隧道详情',
                        },
                    },
                    {
                        path: 'downloads',
                        name: 'modules.tunnels.downloads',
                        component: () => import('../views/modules/tunnels/Downloads.vue'),
                        meta: {
                            title: '下载客户端',
                        },
                    },
                ],
            },
        ],
    },

    // Errors routes
    {
        path: '/errors',
        name: 'errors',
        props: true,
        component: () => import('../views/errors/Base.vue'),
        meta: {
            collapses: ['left'],
        },
        children: [
            {
                path: '404',
                name: 'errors.404',
                component: () => import('../views/errors/404.vue'),
            },
            {
                path: '500',
                name: 'errors.500',
                component: () => import('../views/errors/500.vue'),
            },
        ],
    },
    {
        path: '/:catchAll(.*)',
        redirect: {
            name: 'errors.404',
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    if (to.matched.length === 0) {
        return router.push({name: 'errors.404'})
    }

    if (to.meta.title) {
        document.title = to.meta.title + ' - ' + app.name
    } else {
        document.title = app.name
    }

    if (to.meta.auth ?? true) {
        // validate login state
        if (user.state.token == null) {
            if (to.name === 'auth.login') {
                return true
            } else {
                let query = {}
                if (from.query.token != null) {
                    query = {token: from.query.token}
                }
                router.push({name: 'auth.login', query: query})
                    .then()
                    .catch((r) => console.error(r))
            }
            return false
        } else {
            return true
        }
    } else {
        document.title = app.name

        return true
    }
})

export default router
