<script lang="ts">
  import { defineComponent, toRef, Ref, h, RendererNode, watch } from "vue"
  import { ElInput } from "element-plus"
  import { _PROPS_MERGE } from "../util"
  export default defineComponent({
    name: "Input",
    components: {
      ElInput
    },
    props: {
      config: {
        type: Object,
        required: true
      },
      modelValue: {
        type: [String, Number],
        required: true
      }
    },
    emits: ["update:modelValue"],
    setup(props, context) {
      let localVal: Ref<string | number> = toRef(props, "modelValue")
      const PRIVATE_DEFAULT_PROPS = {
        modelValue: localVal
      }
      const PUBLIC_DEFAULT_PROPS = {
        clearable: true
      }
      const RESET_PLACEHOLDER = () => {
        const suffix = props.config.label.slice(-1)
        const has_suffix = [":", "："].includes(suffix)
        if (has_suffix) {
          return `请输入${props.config.label.slice(0, props.config.label.length - 1)}`
        } else {
          return `请输入${props.config.label}`
        }
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
        PRIVATE_DEFAULT_PROPS,
        PUBLIC_DEFAULT_PROPS,
        RESET_PLACEHOLDER,
        localVal
      }
    },
    render(_ctx: RendererNode) {
      return h(ElInput, {
        ..._PROPS_MERGE(_ctx.config, _ctx.PRIVATE_DEFAULT_PROPS, _ctx.PUBLIC_DEFAULT_PROPS),
        placeholder: _ctx.RESET_PLACEHOLDER(),
        ..._ctx.config.attrs,
        "onUpdate:modelValue": (value: string) => {
          _ctx.localVal = value
        }
        // onInput: (value: any) => {
        //   /* render 函数中 表单双向绑定的真谛就是处理input事件
        //    * render 函数的 官方示例也是如此
        //    * 依赖的  element 官方也表示需要处理 input 事件
        //    * 此处的  input 事件并非原生事件，是经过 element 抛出后的事件
        //    * 入参写  value 是因为拿到的不是 InputEvent ，而是经过处理后的值
        //    */
        //   _ctx.localVal.value = value.trim()
        // }
      })
    }
  })
</script>
