import { _RouteRecordBase } from "vue-router"
import { CustomRouteRecordRaw } from "./index.d"
import Layout from "/@/components/layout/index.vue"
import Home from "/@/views/Home.vue"
import NotFound from "/@/views/error-page/Not-Found.vue"

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
