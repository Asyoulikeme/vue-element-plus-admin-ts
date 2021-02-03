<template>
  <el-menu
    router
    class="el-menu-vertical-demo"
    :collapse="SYSTEM_INFO.isCollapse"
    :default-active="$route.path"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :unique-opened="true"
    :active-text-color="variables.menuActiveText"
    @select="menuSelect"
  >
    <sidebar :item="routes" base-path="" />
  </el-menu>
</template>

<script scoped lang="ts">
import { useRouter, useRoute } from "vue-router"
import { ref, onMounted } from "vue"
import Sidebar from "./Sidebar.vue"

import { useDynamicRoutesHook } from "/@/composition/useTagViewApi"
import { useSystemStoreHook } from "/@/composition/useSystemStoreApi"
import variables from "/@/style/variable.less"
export default {
  components: {
    Sidebar
  },
  props: {
    routes: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup() {
    const { SYSTEM_INFO } = useSystemStoreHook()
    const route = useRoute()
    const { addDynamicRouteTag } = useDynamicRoutesHook()

    function menuSelect(index: any) {
      let parentPath = ""
      let parentPathIndex = index.lastIndexOf("/")
      if (parentPathIndex > 0) {
        parentPath = index.slice(0, parentPathIndex)
      }
      addDynamicRouteTag(index, parentPath)
    }
    return {
      SYSTEM_INFO,
      menuSelect,
      variables
    }
  }
}
</script>
