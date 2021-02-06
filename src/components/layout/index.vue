<template>
  <el-container direction="vertical" class="max-container">
    <el-header>
      <system-info />
    </el-header>
    <el-container direction="horizontal">
      <aside>
        <sidebar :routes="routes" />
      </aside>
      <el-container direction="vertical" class="inner-container">
        <nav class="nav">
          <navbar />
        </nav>
        <el-main>
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <keep-alive :include="Array.from(cachedViews)">
                <component :is="Component" class="view" />
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
  import { watchEffect, Transition } from "vue"

  import { useRoute } from "vue-router"

  import Sidebar from "./components/Sidebar/index.vue"
  import Navbar from "./components/Header/index.vue"
  import SystemInfo from "./components/Header/SystemInfo.vue"
  import { useDynamicRoutesHook } from "/@/composition/useTagViewApi"
  import { useSystemStoreHook } from "/@/composition/useSystemStoreApi"
  export default {
    components: {
      Transition,
      Sidebar,
      Navbar,
      SystemInfo
    },
    setup() {
      const { addDynamicRouteTag, cachedViews } = useDynamicRoutesHook()
      const { SYSTEM_INFO } = useSystemStoreHook()
      const route = useRoute()

      const routes = SYSTEM_INFO.allRoutes
      // 初始化页面刷新保证当前路由tabview存在
      const stop = watchEffect(() => {
        addDynamicRouteTag(route)
      })

      return {
        routes,
        cachedViews
      }
    }
  }
</script>
<style scoped>
  section.el-container.is-vertical.max-container {
    height: 100vh;
    width: 100%;
    box-sizing: border-box;
  }
  section.el-container.is-vertical.inner-container {
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-header {
    background-color: #262f3e;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .nav {
    width: 100%;
    height: 65px;
  }
  .el-main::-webkit-scrollbar {
    display: none;
  }
  .el-aside {
    width: 210px !important;
    box-sizing: border-box;
    height: 100vh;
    overflow-y: scroll;
  }
  .el-menu {
    width: 210px;
    min-height: 100%;
    background-color: #1e222d !important;
  }
  .el-menu--collapse {
    width: 60px;
  }
  /*隐藏文字*/
  .el-menu--collapse :deep(.el-submenu__title) span {
    display: none;
  }
  /*隐藏 > */
  .el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
</style>
<style scoped>
  /* fade-transform */
  .fade-transform-leave-active,
  .fade-transform-enter-active {
    transition: all 0.5s ease;
  }

  .fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
  }

  .fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>
