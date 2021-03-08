<template>
  <div class="amazing-filter-wrapper">
    <el-form
      :ref="filterRef"
      size="mini"
      inline
      :model="filter"
      :class="{ 'need-error-msg': isShowVerifyErrorMsg && isShowExtFilter }"
      :show-message="isShowVerifyErrorMsg"
      :rules="rules"
      :label-width="`${labelWidth}px`"
      @validate="handleValidate"
    >
      <div class="base-filter-wrapper">
        <el-form-item
          v-for="vnodeConfig in filterConfig.filter((item, index) => index < baseIndex)"
          :key="
            Array.isArray(vnodeConfig.key)
              ? renameKey(vnodeConfig.key[0], vnodeConfig.key[1])
              : vnodeConfig.key
          "
          :prop="
            Array.isArray(vnodeConfig.key)
              ? renameKey(vnodeConfig.key[0], vnodeConfig.key[1])
              : vnodeConfig.key
          "
          :label="`${vnodeConfig.label}`"
          :style="{ width: `${(vnodeConfig.col || getCol(vnodeConfig)) * extWidthNum}px` }"
        >
          <component
            :is="renderFactory"
            v-model="
              filter[
                Array.isArray(vnodeConfig.key)
                  ? renameKey(vnodeConfig.key[0], vnodeConfig.key[1])
                  : vnodeConfig.key
              ]
            "
            :config="vnodeConfig"
          />
        </el-form-item>
        <filter-button
          :is-show-ext-filter="isShowExtFilter"
          :len="config.length"
          :base-has="baseIndex"
          @query="handleQueryAction"
          @reset="handleResetForm"
          @expand="handleCollapseStatus"
        />
      </div>
      <!-- ext-filter-wrapper 元素中的代码与 上述一致，只是为了做区分-->
      <div v-show="isShowExtFilter && config.length > baseIndex" class="ext-filter-wrapper">
        <el-form-item
          v-for="vnodeConfig in filterConfig.filter((item, index) => index >= baseIndex)"
          :key="
            Array.isArray(vnodeConfig.key)
              ? renameKey(vnodeConfig.key[0], vnodeConfig.key[1])
              : vnodeConfig.key
          "
          :prop="
            Array.isArray(vnodeConfig.key)
              ? renameKey(vnodeConfig.key[0], vnodeConfig.key[1])
              : vnodeConfig.key
          "
          :label="`${vnodeConfig.label}`"
          :style="{ width: `${(vnodeConfig.col || getCol(vnodeConfig)) * extWidthNum}px` }"
        >
          <component
            :is="renderFactory"
            v-model="
              filter[
                Array.isArray(vnodeConfig.key)
                  ? renameKey(vnodeConfig.key[0], vnodeConfig.key[1])
                  : vnodeConfig.key
              ]
            "
            :config="vnodeConfig"
          />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts">
  import {
    defineComponent,
    watch,
    reactive,
    ref,
    Ref,
    onMounted,
    onUnmounted,
    computed,
    unref,
    provide
  } from "vue"
  import { FormItemConfig, FormItemType, Options } from "../types/index"
  import { getCol, dateFormat, renameKey } from "./methods"
  import dayjs from "dayjs"
  import renderFactory from "../render-factory/render-dispatcher.vue"
  import FilterButton from "../render-factory/button-render.vue"
  export default defineComponent({
    name: "Form",
    components: {
      FilterButton
    },
    props: {
      config: {
        required: true,
        type: Array
      },
      isShowVerifyErrorMsg: {
        required: false,
        type: Boolean,
        default: false
      },
      /* form-item 列宽 */
      colWidth: {
        required: false,
        type: Number,
        default: 190
      }
    },
    emits: ["change", "onValidate", "query", "negativeAllDone", "allDone"],
    setup(props, context) {
      /* ------ 整个表单挂载后的ref */
      const filterRef: Ref<any> = ref(null)
      const Form = unref(filterRef)
      /* ------ 数据区 */
      /* v-model 双向绑定数据 */
      let filter: FormItemType | Record<string, never> = reactive({})
      /* filter的配置 */
      let filterConfig: FormItemConfig = reactive([])
      /* base 行换行标记 */
      const baseIndex: Ref<number> = ref(3)
      /* 用于数组类型的key值 */
      let mappingList: Record<string, any> = reactive({})
      /* 表单查询不需要用到的中间key值 */
      let notNeedKey: Array<string> = reactive([])
      /* 扩展按钮区域是否显示 */
      const isShowExtFilter: Ref<boolean> = ref(true)
      /* label宽度 */
      let maxLabelWidth: Ref<string> = ref("")
      /* 表单校验规则 */
      let rules: Record<string, any> = reactive({})
      /* 所有的options，select，checkboxGroup ，radioGroup */
      const optionsMap: Record<string, Array<Options>> = reactive({})
      /* provide 向下层注入 */
      provide("optionsMap", optionsMap)
      /* 默认的labelwidth，不直接使用是因为 el-form-item 已被extWidthNum定宽，需要动态计算最终的 useLabelWidth */
      let labelWidth = computed(() => {
        return (maxLabelWidth.value.length + 1) * 15
      })
      const extWidthNum = computed(() => {
        /* 展开的筛选条件默认宽度的基数 */
        return labelWidth.value + props.colWidth
      })
      /* ------ 内部函数 */
      function init(): void {
        initFilterConfig()
        initAssignResponsiveData()
        initReAssignForPicker()
        initAssignRules()
        ininCalcLabelWidth()
        initCollectOptions()
        /* 没有采用统一的监听 filter {deep:true} 是因为无法方便的拿到key */
        initWatchFilter()
      }
      function initFilterConfig(): void {
        /* main task */
        filterConfig = props.config as FormItemConfig
        /* sub task ,决定base行放几个 filter */
        let colSum = 0
        for (let index = 0; index < filterConfig.length; index++) {
          const item = filterConfig[index]
          const col = item.col || getCol(item)
          colSum += col
          if (colSum === 3) {
            /* 2+1 = 3 || 1 + 1 + 1 = 3  || 3 = 3*/
            baseIndex.value = index === 0 ? 1 : (3 % index) + 2
            return
          } else if (colSum > 3) {
            /* 2 + 2 || 1 + 1 + 2 || 1 + 3 */
            baseIndex.value = (3 % index) + 2
            return
          }
        }
      }
      function initAssignResponsiveData() {
        filterConfig.forEach((item: FormItemType) => {
          /* config有默认值 且key为数组 */
          if (Object.prototype.hasOwnProperty.call(item, "default") && Array.isArray(item.key)) {
            const NOT_NEED_KEY = item.key[0] + item.key[1]
            notNeedKey.push(NOT_NEED_KEY)
            filter[NOT_NEED_KEY] = item.default
            filter[item.key[0]] = item.default[0]
            filter[item.key[1]] = item.default[1]

            /* 解铃还需系铃人 */
            mappingList[NOT_NEED_KEY] = [item.key[0], item.key[1]]
          }
          /* config 没有默认值 且key为数组 */
          if (!Object.prototype.hasOwnProperty.call(item, "default") && Array.isArray(item.key)) {
            const NOT_NEED_KEY = item.key[0] + item.key[1]
            notNeedKey.push(NOT_NEED_KEY)
            filter[NOT_NEED_KEY] =
              item.type !== "time" ? [] : [new Date(1970, 0), new Date(1970, 0)]
            filter[item.key[0]] = ""
            filter[item.key[1]] = ""
            mappingList[NOT_NEED_KEY] = [item.key[0], item.key[1]]
          }
          /* config有默认值 且key不是数组 */
          if (Object.prototype.hasOwnProperty.call(item, "default") && !Array.isArray(item.key)) {
            filter[item.key as string] = item.default
          }
          /* config有默认值 且为多选类型 */
          if (Object.prototype.hasOwnProperty.call(item, "default") && item.multiple) {
            filter[item.key as string] = item.default
          }
          /* config没有默认值 且为多选类型 */
          if (!Object.prototype.hasOwnProperty.call(item, "default") && item.multiple) {
            filter[item.key as string] = []
          }
          /* config item 啥也不是 */
          if (
            !Object.prototype.hasOwnProperty.call(item, "default") &&
            !item.multiple &&
            !Array.isArray(item.key) &&
            item.component !== "checkboxGroup"
          ) {
            filter[item.key as string] = ""
          }
          /* config item 啥也不是,但却是 checkboxGroup */
          if (
            !Object.prototype.hasOwnProperty.call(item, "default") &&
            !item.multiple &&
            !Array.isArray(item.key) &&
            item.component === "checkboxGroup"
          ) {
            filter[item.key as string] = []
          }
        })
      }
      function initReAssignForPicker() {
        /**
         * 该函数的作用是为 picker 类型的表单初始化值
         * 对于其它类型的表单来说，default值就是函数initAssignResponsiveData最终初始化的值
         * 对于 picker 来说，允许默认值传一个 时间戳 Date.now() 或者是一个对象 new Date(),
         * 此时本组件 this 实例中的值是 Date.now() 或 Date object 的时候，
         * 交给下游分发组件渲染 picker的时候，picker-render 内部会对传入的值做处理，并将传入的Date.now() 或 Date object进行格式化
         * 因此必定会触发watch，此时内部无论如何change都不会触发本组件的watch，因为执行到这里时还没调用 initWatchFilter,
         * 因此initWatchFilter必须放到最后执行，否则初始化就会触发change事件
         * 等initWatchFilter 执行完了，建立了监测，picker-render中的 watch会 emit到此处，拿 picker-render中的值与本函数赋值后的值比较
         * 比较发现两个值是一样的（这个函数将 时间戳、对象等值变成了最终 picker要format的string），最终达到初始化 watch 不会触发
         * */
        filterConfig.forEach((item: FormItemType) => {
          if (
            Object.prototype.hasOwnProperty.call(item, "component") &&
            item.component === "picker" &&
            Object.prototype.hasOwnProperty.call(item, "default")
          ) {
            const FORMAT = dateFormat(item.type)
            if (Array.isArray(item.default)) {
              const value1 = dayjs(item.default[0]).format(FORMAT)
              const value2 = dayjs(item.default[1]).format(FORMAT)
              /* 给依赖数组赋值 */
              filter[item.key[0] + item.key[1]] = [value1, value2]
              /* 给业务最终值分别赋值 */
              filter[item.key[0]] = value1
              filter[item.key[1]] = value2
            } else {
              filter[item.key as string] = dayjs(item.default).format(FORMAT)
            }
          }
        })
      }
      function initAssignRules() {
        filterConfig.forEach((item: FormItemType) => {
          if (Array.isArray(item.key)) {
            item.rules ? (rules[renameKey(item.key[0], item.key[1])] = item.rules) : undefined
          } else {
            item.rules ? (rules[item.key] = item.rules) : undefined
          }
        })
      }
      function ininCalcLabelWidth() {
        filterConfig.forEach((item: FormItemType) => {
          maxLabelWidth.value =
            item.label.length > maxLabelWidth.value.length ? item.label : maxLabelWidth.value
        })
      }
      function initCollectOptions() {
        /* 往后在修改此 OPTIONS时不需要 emit  update + sync，因为数组是一个引用*/
        const TYPE = ["select", "checkboxGroup", "radioGroup"]
        filterConfig.forEach((item: FormItemType) => {
          if (TYPE.includes(item.component as string)) {
            OPTIONS[item.key as string] = []
          }
        })
      }
      function initWatchFilter() {
        Object.keys(filter).map((key) => {
          watch(
            () => filter[key],
            (newVal, oldVal) => {
              /* 如果是 range 类型的数组变化  */
              if (Object.hasOwnProperty.call(mappingList, key)) {
                let linkKeyArr = mappingList[key]
                filter[linkKeyArr[0]] = filter[key][0]
                filter[linkKeyArr[1]] = filter[key][1]
              }
              /* 过滤掉生成的key，不暴露给用户 */
              if (notNeedKey.includes(key)) {
                return
              }
              /* 最后不管怎样都 emit */
              context.emit("change", key, newVal, oldVal, filter)
            }
          )
        })
      }
      function asyncQueueActions() {
        if (window.asyncQueue && window.asyncQueue.length !== 0) {
          /* 消极 all done ，必须所有请求都ok */
          Promise.all(window.asyncQueue).then(() => {
            window.asyncQueue!.length = 0
            context.emit("negativeAllDone", { filter, notNeedKey })
          })
          /* 积极 all done ，所有请求都 ed (结束)就能触发 */
          Promise.allSettled(window.asyncQueue).then(() => {
            window.asyncQueue!.length = 0
            context.emit("allDone", { filter, notNeedKey })
          })
          /* 以上两个 allDone方法，最终都会触发 allSettled 的 allDone 这个方法 */
        } else {
          context.emit("allDone", { filter, notNeedKey })
        }
      }
      function clear() {
        filter = reactive({})
        mappingList = reactive({})
        notNeedKey.length = 0
        maxLabelWidth.value = ""
        rules = reactive({})
      }
      /* ------ 模板依赖函数 */
      const handleValidate = (key: string, isPass: boolean, errorMsg: any) => {
        context.emit("onValidate", { key, isPass, errorMsg })
      }
      const handleQueryAction = () => {
        Form.validate((valid: any) => {
          if (valid) {
            context.emit("query", filter, notNeedKey)
          } else {
            isShowExtFilter.value = true
            console.log("error submit!!")
            return false
          }
        })
      }
      const handleResetForm = () => {
        Form.resetFields()
      }
      const handleCollapseStatus = () => {
        isShowExtFilter.value = !isShowExtFilter.value
      }

      onMounted(() => {
        Form.$el.addEventListener("keyup", (event: KeyboardEvent) => {
          event.key === "Enter" && handleQueryAction()
        })
        if (props.config && Array.isArray(props.config) && props.config.length !== 0) {
          asyncQueueActions()
        }
      })
      onUnmounted(() => {
        delete window.asyncQueue
      })
      watch(
        () => props.config,
        (newVal) => {
          clear()
          init()
          if (newVal && Array.isArray(newVal) && newVal.length !== 0) {
            asyncQueueActions()
          }
        }
      )
      return {
        filterRef,
        filter,
        filterConfig,
        renderFactory,
        labelWidth,
        extWidthNum,
        baseIndex,
        mappingList,
        notNeedKey,
        isShowExtFilter,
        rules,
        optionsMap,
        init,
        renameKey,
        getCol,
        handleValidate,
        handleQueryAction,
        handleResetForm,
        handleCollapseStatus
      }
    },
    created() {
      this.init()
    }
  })
</script>
