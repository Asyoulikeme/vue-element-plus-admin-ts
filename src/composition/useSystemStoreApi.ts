import { reactive, computed, ComputedRef } from "vue"
import { default as allRoutes } from "@/router/routes/index"
import { CustomRouteRecordRaw } from "vue-router"
interface SystemInfo {
  isCollapse: boolean
  isTagViews: boolean
  /* 原类型为Array，在vue-router 初始化期间不可访问，所以将其设为联合类型定义，根据computed来计算返回 */
  allRoutes: Array<CustomRouteRecordRaw> | ComputedRef
}
const SYSTEM_INFO = reactive<SystemInfo>({
  /* 菜单折叠 */
  isCollapse: false,
  /* 是否显示tagViews */
  isTagViews: true,
  /* 所有菜单 */
  allRoutes: computed(() => allRoutes)
})
function toggleSidebar() {
  SYSTEM_INFO.isCollapse = !SYSTEM_INFO.isCollapse
}
export const useSystemStoreHook = () => {
  return {
    SYSTEM_INFO,
    toggleSidebar
  }
}
