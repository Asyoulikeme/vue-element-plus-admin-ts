<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { cloneDeep } from "lodash-es"
export default defineComponent({
  name: "App",
  setup() {
    let obj = {}
    const a = cloneDeep(obj)
    //console.log(a)
  }
})
</script>
<style lang="less">
@import "./style/variable.less";
body {
  margin: 0;
}
#app {
  min-width: 1280px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .el-button--primary {
    background: @menuActiveText; // button 主题色保持一致
    border-color: @menuActiveText;
  }
}
</style>
