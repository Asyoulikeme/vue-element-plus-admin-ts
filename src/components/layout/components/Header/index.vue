<template>
  <div class="header_main" style="">
    <div class="collapseicon">
      <i
        :class="SYSTEM_INFO.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="toggleSidebar"
      ></i>
      <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item key="/" :to="{ path: '/' }"> 首页 </el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="(item, index) in breadList"
            :key="index"
          >
            <span v-if="item.redirect === 'noRedirect' && item.path !== '/'" class="breadcrumb-no-redirect">
              {{ item.name }}
            </span>
            <span v-else-if="item.path.startsWith('/') && item.path !== '/'">
              {{ item.meta.title }}
            </span>
            <a v-else-if="item.path !== '/'">{{ item.name }}</a>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="link-tag">
      <tags-view />
    </div>
  </div>
</template>

<script lang="ts">
  import { RouteRecordNormalized, useRoute } from "vue-router"
  import { watch, reactive, computed,ref} from "vue"
  import { useSystemStoreHook } from "@/composition/useSystemStoreApi"
  import TagsView from "../Tagsview/index.vue"

  declare interface CustomRouteLocationMatchedObject {
    currentRouteList: Array<RouteRecordNormalized>
  }
  export default {
    components: {
      TagsView
    },
    setup() {
      const { toggleSidebar, SYSTEM_INFO } = useSystemStoreHook()
      const route = useRoute()
      let routeListConfig: CustomRouteLocationMatchedObject = reactive({
        currentRouteList: []
      })
      const breadList = computed(() => {
        return routeListConfig.currentRouteList.filter(item => item.path !== '/')
      })

      watch(
        () => route.path,
        () => {
          routeListConfig.currentRouteList = route.matched
        },
        {
          immediate: true
        }
      )

      return {
        breadList,
        toggleSidebar,
        routeListConfig,
        SYSTEM_INFO
      }
    }
  }
</script>
<style lang="less">
  @import "@/style/variable.less";
  .collapseicon .el-breadcrumb__inner a:hover,
  .collapseicon .el-breadcrumb__inner.is-link:hover {
    color: #409eff;
  }
  .header_main {
    box-shadow: 1px 1px #eee;
    // padding-top: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding-left: 20px;
  }
  .collapseicon {
    font-size: 18px;
    cursor: pointer;
  }
  // el-icon-s-unfold 折叠后
  .collapseicon .el-icon-s-fold,
  .collapseicon .el-icon-s-unfold {
    font-size: 16px;
    vertical-align: middle;
    margin-right: 5px;
  }
  .el-icon-s-fold {
    color: #409eff;
  }
  .router-display {
    font-size: 14px;
    font-weight: bold;
    margin-right: 2px;
  }
  .el-breadcrumb {
    display: inline-block;
    vertical-align: middle;
  }
  .breadcrumb-no-redirect {
    &:hover {
      cursor: default;
    }
  }
  .link-tag {
    width: 100%;
  }

  /* breadcrumb transition */
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all 0.5s;
  }

  .breadcrumb-enter,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }

  .breadcrumb-move {
    transition: all 0.5s;
  }

  .breadcrumb-leave-active {
    position: absolute;
  }
</style>
