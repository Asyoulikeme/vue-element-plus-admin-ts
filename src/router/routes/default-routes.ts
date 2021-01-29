import { RouteRecordRaw } from "vue-router"
import Layout from "/@/components/layout/index.vue"
import Home from "/@/views/Home.vue"
export const defaultRoutes:RouteRecordRaw[] = [
    {
        path: '/',
        component: Layout,
        meta:{
            title:"供应商管理",
            icon: 'el-icon-s-home',
        },
        children: [
            {
                path: "fs",
                name: "Home",
                component: Home,
                meta: {
                    icon: 'el-icon-s-home',
                    title: "供应商首页",
                    noCache:false
                },
            }
        ],
    }
]