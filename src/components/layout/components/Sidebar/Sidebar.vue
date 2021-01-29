<template>
  <div>
    <template v-for="(routeItem, routeIndex) in item">
      <el-menu-item
        :key="routeIndex"
        :index="resolvePath(routeItem.path)"
        v-if="(routeItem.children && routeItem.children.length <= 0) || !routeItem.children"
      >
        <i :class="routeItem.meta.icon || ''"></i>
        <template #title>{{ routeItem.meta.title }}1</template>
      </el-menu-item>
      <el-submenu
        class="submenu-title"
        :key="routeIndex"
        :index="routeItem.path"
        v-if="routeItem.children && routeItem.children.length > 0"
      >
        <template #title>
          <i :class="routeItem.meta.icon || ''"></i>
          <span>{{ routeItem.meta.title }}2</span>
        </template>
        <el-menu-item-group>
          <sidebar
            :item="routeItem.children"
            :basePath="basePath.length > 0 ? basePath + '/' + routeItem.path : routeItem.path"
          ></sidebar>
        </el-menu-item-group>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import  path from "path"
import { useStore } from "vuex";
import { computed } from 'vue';

export default {
  name: "sidebar",
  props: {
    item: Object,
    basePath: String
  },
  setup(props, context) {
    console.log(props.basePath)
    function resolvePath(routePath) {
      const hasBasePath = props.basePath || "";
      return path.resolve(hasBasePath, routePath);
    }
    return {
      resolvePath: resolvePath,
    };
  }
};
</script>
<style scoped lang="less">
@import '/@/style/variable.less';

  .is-active > .el-submenu__title {
    color: @subMenuActiveText !important;
  }
  .submenu-title-noDropdown,
  :deep(.el-submenu__title),
  .el-menu-item {
    color:#FFFFFF !important;
    &:hover {
      background-color: @menuHover !important;
    }
    &.is-active{
      color:#409EFF;
    }
  }
  .el-menu-item i{
    vertical-align: -1px;
    color: @menuText !important;
  }
  :deep(.el-submenu__title) i{
    color: @menuText !important;
  }
  .el-menu-item.is-active i{
    color: @menuActiveText !important;
  }
  .is-active > :deep(.el-submenu__title) {
    color: @subMenuActiveText !important;
  }

  & .nest-menu .el-submenu > :deep(.el-submenu__title),
  & .el-submenu .el-menu-item {
    
    //min-width: @sideBarWidth !important;
    background-color: @subMenuBg !important;
    &:hover {
      background-color: @subMenuHover !important;
    }
  }
  .el-menu-item:focus{
    background: none;
  }
  :deep(.el-menu-item-group__title) {
    padding: 0;
  }

</style>
