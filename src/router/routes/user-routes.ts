import { RouteRecordRaw } from "vue-router"
import Layout from "/@/components/layout/index.vue"
import AA from "/@/views/user/AA.vue"
import BB from "/@/views/user/BB.vue"
export const userRoutes:RouteRecordRaw[] = [
    {
      path: '/user',
      component: Layout,
      meta: {
        icon: 'el-icon-s-home',
        title: "用户管理",
        noCache:false
      },
      children: [
          {
              path: 'AA',
              name:"AA",
              component: AA,
              meta: {
                  icon: 'el-icon-s-home',
                  title: "A类用户",
                  noCache:false
              },
          },
          {
              path: 'BB',
              name:"BB",
              component: BB,
              meta: {
                  icon: 'el-icon-s-home',
                  title: "B类用户",
                  noCache:false
              },
          }
      ]
  }
]