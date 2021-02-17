<template>
  <el-menu
    router
    class="el-menu-vertical-demo"
    :collapse="states.isCollapse"
    :default-active="$route.path"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :unique-opened="true"
    :active-text-color="variables.menuActiveText"
  >
    <sidebar :item="routes" base-path="" />
  </el-menu>
</template>

<script lang="ts">
  import Sidebar from "./Sidebar.vue"
  import { useSystemStoreHook } from "@/composition/useSystemStoreApi"
  import variables from "@/style/variable.less"
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
      const { states } = useSystemStoreHook()
      return {
        states,
        variables
      }
    }
  }
</script>
s