<template>
  <div>
    AA类用户
    <el-input v-model="localVal" />
  </div>
</template>

<script>
import { ref } from "vue"
export default {
  name: "AA",
  setup() {
    const localVal = ref()

    return {
      localVal
    }
  }
}
</script>

<style scoped></style>
