<template>
  <div class="tags-view">
    <el-scrollbar :vertical="false" class="scroll-container">
      <div
        v-for="(item, index) in dynamicTagList"
        :key="index"
        :class="['scroll-item', $route.path === item.path ? 'active' : '']"
      >
        <router-link :to="item.path">
          {{ item.name }}
        </router-link>
        <span
          v-if="dynamicTagList.length > 1"
          class="el-icon-close"
          @click="closeCurrentRouteTag(item)"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { useDynamicRoutesHook } from "/@/composition/useTagViewApi"
import { useRoute } from "vue-router"
export default {
  setup() {
    const route = useRoute()
    const { delDynamicRouteTag, dynamicRouteTags } = useDynamicRoutesHook()
    function closeCurrentRouteTag(item) {
      delDynamicRouteTag(item, route.path)
    }

    return {
      dynamicTagList: dynamicRouteTags.dRoutes,
      closeCurrentRouteTag
    }
  }
}
</script>
<style scoped lang="less">
@import "/@/style/variable.less";
.tags-view {
  width: 100%;
  height: 35px;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  .scroll-item {
    display: inline-block;
    height: 27px;
    line-height: 1.5;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 3px 8px;
    margin-right: 2px;
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: #666;
    padding: 0 10px;
  }
  span {
    font-size: 13px;
  }
}
.el-icon-close {
  cursor: pointer;
  border-radius: 50%;
  padding: 1px;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.scroll-container {
  text-align: left;
  box-sizing: border-box;
  white-space: nowrap;
  width: 100%;
  height: 100% !important;

  :deep(.el-scrollbar__wrap::-webkit-scrollbar) {
    display: none;
  }
  :deep(.el-scrollbar__wrap) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-scrollbar__view {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      //border: 1px solid red;
    }
  }
}
.active {
  background: #409eff;
  color: #fff;
  a {
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
