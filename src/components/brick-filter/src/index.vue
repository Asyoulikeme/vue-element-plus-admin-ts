<template>
  <div class="amazing-wrapper">
    <data-filter
      :ref="filterRef"
      :config="viewBrick"
      :is-show-verify-error-msg="isShowVerifyErrorMsg"
      @change="handleChange"
      @query="handleQuery"
      @allDone="handleFilterRenderComplete"
      @negativeAllDone="handleFilterRenderAndDataFetchComplete"
      @onValidate="onValidate"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive } from "vue"
  import { FilterVM } from "./types/filter"
  //import { FormItemConfig } from "./@types/index"
  //import DataFilter from './child/data-filter'
  //import { _deepClone } from './util'
  export default defineComponent({
    name: "BrickFilter",
    props: {
      viewBrick: {
        required: true,
        type: Array
      },
      isShowVerifyErrorMsg: {
        required: false,
        type: Boolean,
        default: false
      }
    },
    setup(props, context) {
      const filterRef = reactive(null)
      function setReactiveFilter() {
        filterRef.filter.name = "123"
      }
      return {
        filterRef,
        setReactiveFilter
      }
    }
  })
</script>
