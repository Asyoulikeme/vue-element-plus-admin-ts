<template>
  <div>
    <template v-for="(routeItem, routeIndex) in item">
      <el-menu-item
        :key="routeIndex"
        :index="resolvePath(routeItem.path)"
        v-if="!routeItem.hidden && ((routeItem.children && routeItem.children.length <= 0) || !routeItem.children)"
      >
        <i :class="routeItem.meta && routeItem.meta.icon || ''"></i>
        <template #title>{{ routeItem.meta ? routeItem.meta.title :'' }}1</template>
      </el-menu-item>
      <el-submenu
        class="submenu-title"
        :key="routeIndex"
        :index="routeItem.path"
        v-if="!routeItem.hidden && routeItem.children && routeItem.children.length > 0"
      >
        <template #title>
          <i :class="routeItem.meta && routeItem.meta.icon || ''"></i>
          <span>{{ routeItem.meta && routeItem.meta.title || ""}}2</span>
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
 
  .el-menu{
    color: #c1c6c8;
    border-right:1px solid rgb(48, 65, 86) !important;
    
  }
  .el-menu-item-group{
    background-color: #151822;
  }
  .el-menu-item i{
    color: #c1c6c8;
    vertical-align: -1px;
  }
  :deep(.el-submenu__title){
    color: #c1c6c8;
    box-sizing: border-box;
  }
  .is-active > .el-submenu__title {
    color: @subMenuActiveText !important;
    background-color :@menuActiveBg !important;
  }
  .is-active.el-menu-item {
    color: @menuActiveText !important;
    background-color :@menuActiveBg !important;
  }
  .is-active.el-menu-item i{
    color: @menuActiveText !important;
  }
  .is-active > :deep(ul) {
    background-color: #151822 !important;
  }
  .submenu-title-noDropdown,
  :deep(.el-submenu__title),
  .el-menu-item {
    color:#FFFFFF;
    &:hover {
      background-color: @menuHover;
    }
  }
  .el-menu-item.is-active {
    &:hover{
      background-color:@menuActiveBg !important;
    }
  }
  
  // :deep(.el-submenu__title) i{
  //   color: @menuText !important;
  // }
  

  & .nest-menu .el-submenu > :deep(.el-submenu__title),
  & .el-submenu .el-menu-item:not(.is-active){
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
