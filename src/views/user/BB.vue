<template>
  <div>
    BB类用户
    <el-input v-model="localVal" />
  </div>
</template>

<script>
  import { ref } from "vue"
  export default {
    name: "BB",
    setup() {
      const localVal = ref()

      return {
        localVal
      }
    }
  }
</script>

<style scoped></style>
