<template>
  <div>
    <el-form
      :ref="setFormDataRef"
      inline
      label-width="4rem"
      :model="formData"
      :rules="rules"
      size="small"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="年龄" prop="name">
        <el-input v-model="formData.age" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">点击</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
  import { reactive, ref, getCurrentInstance, ComponentInternalInstance, onMounted } from "vue"
  export default {
    name: "CC",
    setup() {
      const formData = reactive({
        name: "",
        age: ""
      })

      const ci = getCurrentInstance() as ComponentInternalInstance
      //const { proxy } = getCurrentInstance() as ComponentInternalInstance;
      console.log(ci)
      console.log(ci.refs)

      let formDataRef: Record<string, any> = reactive({})
      const setFormDataRef = (el: Record<string, any>) => {
        debugger
        formDataRef = el
      }
      console.log(formDataRef)

      // rules 由于不受 options api 的约束越来越好用了
      const rules = reactive({
        name: [{ required: true, message: "名称必填", trigger: "blur" }],
        age: [{ required: true, message: "年龄必填", trigger: "blur" }]
      })

      function query() {
        console.log(formDataRef)
        formDataRef.validate()
      }
      return {
        rules,
        formData,
        setFormDataRef,
        query
      }
    }
  }
</script>

<style scoped></style>
