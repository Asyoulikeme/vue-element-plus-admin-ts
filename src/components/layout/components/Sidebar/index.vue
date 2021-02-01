<template>
  <el-menu 
    router
    class="el-menu-vertical-demo"
    :collapse="state.system.isCollapse"
    :default-active="$route.path"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :unique-opened="true"
    :active-text-color="variables.menuActiveText"
    @select="menuSelect"
  >
    <sidebar :item="routes" basePath=""></sidebar>
  </el-menu>
</template>

<script scoped lang="ts">
import { useStore } from 'vuex';
import {
    useRouter, useRoute
} from "vue-router";
import {ref, onMounted} from 'vue';
import Sidebar from './Sidebar.vue';

import {useDynamicRoutesHook} from '/@/composition/useTagViewApi';
import variables from '/@/style/variable.less';
export default {
  props: ['routes'],
  components: {
    Sidebar
  },
  setup () {
    const store = useStore();
    const route = useRoute();
    const {addDynamicRouteTag} = useDynamicRoutesHook();

    function menuSelect(index: any) {
      let parentPath = '';
      let parentPathIndex = index.lastIndexOf('/');
      if( parentPathIndex > 0) {
        parentPath = index.slice(0, parentPathIndex);
      }
      addDynamicRouteTag(index, parentPath);
    }
    return {
      state: store.state,
      menuSelect,
      variables
    };
  }
  
};
</script>