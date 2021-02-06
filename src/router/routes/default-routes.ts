import { _RouteRecordBase, CustomRouteRecordRaw } from "vue-router"

import Layout from "/@/components/layout/index.vue"
import Home from "/@/views/Home.vue"
import NotFound from "/@/views/error-page/Not-Found.vue"

/* Extensions */
declare module "vue-router" {
  export interface _CustomRouteRecordBase extends _RouteRecordBase {
    hidden?: boolean
    component?: RouteComponent
  }
  export type CustomRouteRecordRaw = _CustomRouteRecordBase
}

export const defaultRoutes: CustomRouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: Home,
        name: "Home",
        meta: {
          title: "首页",
          icon: "el-icon-s-home"
        }
      }
    ]
  },
  {
    path: "/404",
    component: Layout,
    hidden:true,
    children: [
      {
        path: "",
        component: NotFound,
        name: "NotFound",
        meta: {
          title: "404"
        }
      }
    ]
  },
  { 
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    hidden: true,
    //name: "NotFound"
  }
]
