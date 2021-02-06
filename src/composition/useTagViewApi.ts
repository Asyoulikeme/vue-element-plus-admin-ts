import { ref } from "vue"
import { useRouter, CustomRouteRecordRaw } from "vue-router"

const cachedViews = ref(new Set())
const visitedViews = ref([])
// window.visitedViews = visitedViews
// window.cachedViews = cachedViews

export function useDynamicRoutesHook() {
  /**
   * @param view String 当前变化的路由
   */
  function addDynamicRouteTag(view: CustomRouteRecordRaw) {
    if (visitedViews.value.some((v) => v.path === view.path)) return
    visitedViews.value.push({ ...view, title: view.meta.title || "no-name" })
    view.meta && !view.meta.noCache && addCachedView(view.name)
  }
  /**
   * @param currentToBeCloseRoute object 当前点击了关闭的viewTag路由
   * @param currentActivePath String 当前激活的路由path
   */
  const router = useRouter()

  function delDynamicRouteTag(currentToBeCloseRoute: any, currentActivePath: string) {
    new Promise<void>((resolve) => {
      const valueIndex = visitedViews.value.findIndex(
        (item) => item.path === currentToBeCloseRoute.path
      )
      visitedViews.value.splice(valueIndex, 1)
      resolve()
    }).then(() => {
      if (currentActivePath === currentToBeCloseRoute.path) {
        // 如果删除当前激活tag就自动切换到最后一个tag
        const newRoute = visitedViews.value.slice(-1)
        router.push({
          path: newRoute[0].path
        })
      }
    })
  }

  return {
    addDynamicRouteTag, // tagviews 动态生成
    delDynamicRouteTag, // 删除tagview
    cachedViews, // 当前已被缓存的路由数组
    visitedViews // 当前打开了的路由数组
  }
}

function addCachedView(name: string) {
  cachedViews.value.add(name)
}
