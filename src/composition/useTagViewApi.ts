import { reactive, ref } from "vue"
import { default as allRoutes } from "/@/router/routes/index"
import { useRouter } from "vue-router"

const dynamicRouteTags = reactive({
  dRoutes: [{ path: "/", name: "首页" }]
})
const cachedViews = ref(new Set())
const excludeRoutes = ["/home"]

export function useDynamicRoutesHook() {
  const router = useRouter()
  /**
   * @param value String 当前menu对应的路由path
   * @param parentPath string 当前路由中父级路由
   */
  function addDynamicRouteTag(value: any, parentPath: any) {
    const hasActiveRoute = dynamicRouteTags.dRoutes.some((item, index) => {
      return item.path === value || excludeRoutes.includes(value)
    })
    if (!hasActiveRoute) {
      function concatPath(arr: any, value: any, parentPath: any) {
        arr.forEach((constItem: any) => {
          const pathConcat = constItem.redirect
            ? constItem.redirect
            : parentPath
            ? parentPath + "/" + constItem.path
            : constItem.path
          if (constItem.path === value || pathConcat === value) {
            dynamicRouteTags.dRoutes.push({ path: value, name: constItem.name })
            ;((constItem.meta && !constItem.meta.noCache) || !constItem.meta) &&
              addCachedView(constItem.name)
          } else {
            if (
              Array.isArray(constItem.children) &&
              constItem.children.length > 0
            ) {
              concatPath(constItem.children, value, parentPath)
            }
          }
        })
      }
      concatPath(allRoutes, value, parentPath)
    }
  }
  /**
   * @param value String 当前删除tag路由
   * @param current Objct 当前激活路由对象
   */
  function delDynamicRouteTag(value: string, current: object) {
    new Promise<void>((resolve, reject) => {
      const valueIndex = dynamicRouteTags.dRoutes.findIndex(
        (item) => item.path === value.path
      )
      dynamicRouteTags.dRoutes.splice(valueIndex, 1)
      resolve()
    }).then(() => {
      if (current === value.path) {
        // 如果删除当前激活tag就自动切换到最后一个tag
        let newRoute = dynamicRouteTags.dRoutes.slice(-1)
        router.push({
          path: newRoute[0].path
        })
      }
    })
  }

  return {
    dynamicRouteTags, // 动态路由数组
    addDynamicRouteTag, // tagviews 动态生成
    delDynamicRouteTag, // 删除tagview
    cachedViews
  }
}

function addCachedView(name: string) {
  cachedViews.value.add(name)
}

function removeCachedView(name: string) {
  cachedViews.value.delete(name)
}
