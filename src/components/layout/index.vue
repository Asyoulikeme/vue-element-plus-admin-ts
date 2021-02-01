<template>
  <div>
    <el-container>
      <aside>
        <Sidebar :routes="routes"></Sidebar>
      </aside>
      <el-container>
        <el-header>
          <Head></Head>
        </el-header>
        <el-main>
            <router-view v-slot="{ Component }">
              <transition name="fade-transform" mode="out-in">
                <keep-alive :include="Array.from(cachedViews)">
                  <component class="view" :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { ref, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

import Sidebar from "./components/Sidebar/index.vue";
import Head from "./components/Header/index.vue";

import { useDynamicRoutesHook } from "/@/composition/useTagViewApi";
export default {
  setup() {
    const { addDynamicRouteTag,cachedViews } = useDynamicRoutesHook();
    window.fss = cachedViews
    const route = useRoute();
    const store = useStore();
    const routes = store.state.system.allRoutes;
    // const cachedViews = store.state.system.cachedViews
    // 初始化页面刷新保证当前路由tabview存在
    const stop = watchEffect(() => {
      const parentPath = route.path.slice(0, route.path.lastIndexOf("/"));
      console.log("parentPath",parentPath)
      addDynamicRouteTag(route.path, parentPath);
    });
    setTimeout(() => {
      // 监听只执行一次，但获取不到当前路由，需要下一个事件轮询中取消监听
      stop();
    }, 0);
    return {
      routes,
      cachedViews
    };
  },
  components: {
    Sidebar,
    Head
  }
};
</script>
<style scoped>
section.el-container.is-vertical {
  height: 100vh;
  overflow-y: scroll;
  width: calc(100vh - 210px);
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
<style lang="less" scoped>
// @import "@/style/transition.less";
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s ease;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.el-header {
  padding: 0;
  height: 70px !important;
}
</style>
