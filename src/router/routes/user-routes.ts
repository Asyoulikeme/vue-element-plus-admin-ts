import { RouteRecordRaw } from "vue-router"
import Layout from "/@/components/layout/index.vue"
import AA from "/@/views/user/AA.vue"
import BB from "/@/views/user/BB.vue"
import CC from "/@/views/vendor/CC.vue"
export const userRoutes:RouteRecordRaw[] = [
    {
      path: '/user',
      component: Layout,
      meta: {
        icon: 'el-icon-user-solid',
        title: "用户管理",
      },
      children: [
          {
              path: 'AA',
              name:"AA",
              component: AA,
              meta: {
                  icon: 'el-icon-s-home',
                  title: "A类用户",
              },
          },
          {
              path: 'BB',
              name:"BB",
              component: BB,
              meta: {
                  icon: 'el-icon-s-home',
                  title: "B类用户",
                  noCache:true
              },
          }
      ]
  },
  {
    path: '/vendor',
    component: Layout,
    meta:{
        title:"供应商管理",
        icon: 'el-icon-s-shop',
    },
    children: [
        {
            path: "CC",
            name: "CC",
            component: CC,
            meta: {
                icon: 'el-icon-s-home',
                title: "CC",
                noCache:false
            },
        }
    ],
}
]