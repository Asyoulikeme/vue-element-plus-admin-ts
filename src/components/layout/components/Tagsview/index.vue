<template>
  <div class="tags-view">
    <el-scrollbar
      :vertical="false"
      class="scroll-container"
    >
      <div v-for="(item, index) in dynamicTagList" :key="index" :class="['scroll-item', $route.path === item.path ? 'active' : '']">
        <router-link :to="item.path">
          {{item.name}}
        </router-link>
        <span @click="deleteOneMenu(item)" v-if="index !==0 " class="el-icon-close"></span>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import {useDynamicRoutesHook} from '/@/composition/useTagViewApi.ts';
import {useRoute} from 'vue-router';
export default {
  setup() {
    const route = useRoute();
    const {deleteDynamicTag, dynamic} = useDynamicRoutesHook();

    function deleteOneMenu(item) {
      deleteDynamicTag(item, route.path);
    }
    
    return {
        dynamicTagList: dynamic.dRoutes,
        deleteOneMenu
    };
  }
};
</script>
<style scoped lang="less">
@import '/@/style/variable.less';
.tags-view {
  width: 100%;
  height:35px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  .scroll-item {
    display: inline-block;
    height:27px;
    border: 1px solid #eee;
    border-radius: 3px;
    padding: 3px 8px;
    margin-right: 2px;
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: #666;
    padding: 0 10px;
  }
}
.el-icon-close{
    cursor: pointer;
    border-radius: 50%;
    padding: 1px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.el-icon-close:hover{
  background: #b4bccc;
}
.scroll-container {
  text-align: left;
  box-sizing: border-box;
  white-space: nowrap;
  width: 100%;
  height: 100% !important;

  :deep(.el-scrollbar__wrap::-webkit-scrollbar){
    display: none;
  }
   :deep(.el-scrollbar__wrap){
     
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-scrollbar__view{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      //border: 1px solid red;
    }
  }
  
}
.active{
  background: @menuActiveText;
  color: #fff;
  a{
    color: #fff;
  }
}
// .active::before{
//     content: "";
//     background: #fff;
//     display: inline-block;
//     width: 8px;
//     height: 8px;
//     border-radius: 50%;
//     position: absolute;
//     top: 50%;
//     left: 5px;
//     margin-top: -4px;
//     margin-right: 2px;
// }
</style>
