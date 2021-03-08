<script lang="ts">
  import { ElSelect, ElOption } from "element-plus"
  import { Options } from "../types"
  import { _PROPS_MERGE, _WAIT_PROMISE_FULFILLED, _DO_MAPPER_TRANSFER } from "../util"
  import { defineComponent, watch, Ref, toRef, reactive, h, RendererNode, inject } from "vue"
  export default defineComponent({
    name: "Select",
    components: {
      ElSelect,
      ElOption
    },
    inject: ["optionsMap"],
    props: {
      config: {
        type: Object,
        required: true
      },
      modelValue: {
        type: [String, Number, Boolean, Array, Object],
        required: true
      }
    },
    emits: ["update:modelValue"],
    setup(props, context) {
      let localVal: Ref<unknown> = toRef(props, "modelValue")
      const remoteData = reactive([])
      const optionsMap = inject<Record<string, Array<Options>>>("optionsMap")
      const PRIVATE_DEFAULT_PROPS = {
        value: localVal.value
      }
      const PUBLIC_DEFAULT_PROPS = {
        clearable: true,
        filterable: remoteData.length > 7,
        multiple: props.config.multiple,
        "collapse-tags": true
      }
      const RESET_PLACEHOLDER = () => {
        const suffix = props.config.label.slice(-1)
        const has_suffix = [":", "："].includes(suffix)
        if (has_suffix) {
          return `请选择${props.config.label.slice(0, props.config.label.length - 1)}`
        } else {
          return `请选择${props.config.label}`
        }
      }
      const _SELECT_OPTIONS = (source: Array<Record<string, any>>) => {
        const data = Object.prototype.hasOwnProperty.call(props.config, "mapper")
          ? _DO_MAPPER_TRANSFER.call(this, source)
          : source
        optionsMap![props.config.key] = data
        const VNodeList: Array<RendererNode> = []
        data.forEach((item, index) => {
          VNodeList.push(
            h(ElOption, {
              label: item.text,
              value: item.value,
              key: index
            })
          )
        })
        return VNodeList
      }
      watch(
        () => props.modelValue,
        (newVal) => {
          localVal.value = newVal
        }
      )
      watch(localVal, (newVal) => {
        context.emit("update:modelValue", newVal)
      })

      return {
        localVal,
        remoteData,
        _SELECT_OPTIONS,
        PRIVATE_DEFAULT_PROPS,
        PUBLIC_DEFAULT_PROPS,
        RESET_PLACEHOLDER
      }
    },
    render() {
      return h(
        ElSelect,
        {
          ..._PROPS_MERGE(this.config, this.PRIVATE_DEFAULT_PROPS, this.PUBLIC_DEFAULT_PROPS),
          placeholder: this.RESET_PLACEHOLDER(),
          ...this.config.attrs,
          "onUpdate:modelValue": (
            value: string | number | Array<any> | boolean | Record<string, any>
          ) => {
            this.localVal = value
          }
        },
        [
          ...(Array.isArray(this.config.options)
            ? this._SELECT_OPTIONS(this.config.options)
            : typeof this.config.options === "function"
            ? _WAIT_PROMISE_FULFILLED.call(this, this.config.options, this._SELECT_OPTIONS)
            : [])
        ]
      )
    }
  })
</script>
