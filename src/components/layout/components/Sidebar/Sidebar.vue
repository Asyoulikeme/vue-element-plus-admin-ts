<template>
  <div>
    <template v-for="routeItem in item">
      <template v-if="!routeItem.hidden">
        <el-menu-item
          v-if="caseA(routeItem)"
          :key="resolvePath(routeItem.path)"
          :index="resolvePath(routeItem.path)"
        >
          <template #title>
            {{ routeItem.children[0].meta ? routeItem.children[0].meta.title : "" }}
          </template>
        </el-menu-item>
        <el-menu-item
          v-else-if="caseB(routeItem)"
          :key="resolvePath(routeItem.redirect)"
          :index="resolvePath(routeItem.redirect)"
        >
          <template #title>
            {{ routeItem.children[0].meta ? routeItem.children[0].meta.title : "" }}
          </template>
        </el-menu-item>
        <el-menu-item
          v-else-if="caseC(routeItem)"
          :key="resolvePath(routeItem.path)"
          :index="resolvePath(routeItem.path)"
        >
          <i :class="(routeItem.meta && routeItem.meta.icon) || ''"></i>
          <template #title> {{ routeItem.meta ? routeItem.meta.title : "" }}</template>
        </el-menu-item>
        <el-submenu
          v-else
          :key="resolvePath(routeItem.path)"
          class="submenu-title"
          :index="routeItem.path"
        >
          <template #title>
            <i :class="(routeItem.meta && routeItem.meta.icon) || ''"></i>
            <span>{{ (routeItem.meta && routeItem.meta.title) || "" }}</span>
          </template>
          <el-menu-item-group>
            <sidebar
              :item="routeItem.children"
              :base-path="basePath.length > 0 ? basePath + '/' + routeItem.path : routeItem.path"
            />
          </el-menu-item-group>
        </el-submenu>
      </template>
    </template>
  </div>
</template>
<script>
  export default {
    name: "Sidebar",
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      },
      basePath: {
        type: String,
        default: () => {
          return ""
        }
      }
    },
    setup(props) {
      /**
       * 考虑分三种情况 均在 hidden != false 的前提下讨论
       * 1、仅有一级菜单，无children 需要显示
       * 2、有且仅有一个children，且第children的path 为 '' ，
       * 3、有多个children需要展示
       * */
      /* 只有一个子元素的,且默认显示子元素 */
      function caseA(route) {
        const flag =
          Array.isArray(route.children) &&
          route.children.length === 1 &&
          route.children[0].path === ""
        flag && console.log("caseA pass")
        return flag
      }
      /* 只有一个子元素的，且直接是重定向到子元素上面，此时使用redirect的path */
      function caseB(route) {
        const flag =
          Array.isArray(route.children) &&
          route.children.length === 1 &&
          (route.path + "/" + route.children[0].path).replace(/\/\//, "/") === route.redirect
        flag && console.log("caseB pass")
        return flag
      }
      /* 正常路由，仅一级 */
      function caseC(route) {
        const flag = (route.children && route.children.length <= 0) || !route.children
        flag && console.log("caseC pass")
        return flag
      }
      /* 正常路由，多级 */
      function caseD(route) {
        const flag = Array.isArray(route.children) && route.children && route.children.length > 0
        flag && console.log("caseC pass")
        return flag
      }
      function resolvePath(routePath) {
        const hasBasePath = props.basePath || ""
        return `${hasBasePath}/${routePath}`.replace(/\/\//, "/")
      }
      return {
        resolvePath,
        caseA,
        caseB,
        caseC,
        caseD
      }
    }
  }
</script>
<style scoped lang="less">
  @import "@/style/variable.less";

  .el-menu {
    color: #c1c6c8;
    border-right: 1px solid rgb(48, 65, 86) !important;
  }
  .el-menu-item-group {
    background-color: #151822;
  }
  .el-menu-item i {
    color: #c1c6c8;
    vertical-align: -1px;
  }
  :deep(.el-submenu__title) {
    color: #c1c6c8;
    box-sizing: border-box;
    height: 45px;
    line-height: 45px;
  }
  .el-menu-item{
    box-sizing: border-box;
    height: 45px !important;
    line-height: 45px !important;
  }
  .is-active > .el-submenu__title {
    color: @subMenuActiveText !important;
    background-color: @menuActiveBg !important;
  }
  .is-active.el-menu-item {
    color: @menuActiveText !important;
    background-color: @menuActiveBg !important;
  }
  .is-active.el-menu-item i {
    color: @menuActiveText !important;
  }
  .is-active > :deep(ul) {
    background-color: #151822 !important;
  }
  .submenu-title-noDropdown,
  :deep(.el-submenu__title),
  .el-menu-item {
    color: #ffffff;
    &:hover {
      background-color: @menuHover;
    }
  }
  .el-menu-item.is-active {
    &:hover {
      background-color: @menuActiveBg !important;
    }
  }

  // :deep(.el-submenu__title) i{
  //   color: @menuText !important;
  // }

  & .nest-menu .el-submenu > :deep(.el-submenu__title),
  & .el-submenu .el-menu-item:not(.is-active) {
    &:hover {
      background-color: @subMenuHover !important;
    }
  }
  .el-menu-item:focus {
    background: none;
  }
  :deep(.el-menu-item-group__title) {
    padding: 0;
  }
</style>
