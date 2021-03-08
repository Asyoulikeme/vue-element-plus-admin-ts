<template>
  <Filter :config="config" />
</template>
<script lang="ts">
  import { defineComponent } from "vue"
  import Filter from "./src/child/data-filter.vue"
  export default defineComponent({
    name: "Test",
    components: { Filter },
    setup() {
      const config = [
        {
          key: "vendorId",
          label: "供应商ID",
          //default:"123456",
          disabled: true,
          attrs: {
            placeholder: "fafa111",
            maxlength: 5,
            readonly: "readonly"
          }
        },
        {
          key: "vendorCode",
          label: "供应商编号",
          component: "input",
          default: 20200819
        },
        {
          key: "vendorPhoneNumber",
          label: "供应商手机号",
          component: "input",
          default: "13973140494"
        },
        {
          key: "vendorType",
          label: "供应商类型",
          component: "select",
          multiple: true,
          options: [
            {
              text: "蔬菜供应商",
              value: 0
            },
            {
              text: "常规供应商",
              value: 1
            }
          ],
          rules: [{ required: true, message: "类型必选", trigger: "change" }]
        },
        {
          key: ["signInTimeS", "signInTimeE"],
          label: "注册时间：",
          component: "picker",
          type: "time",
          isRange: true,
          rules: [{ required: true, message: "必选", trigger: "change" }]
          //default: "2020-07-08"
        },
        {
          key: "vendorXTimeStart",
          label: "供应商牛逼时间牛",
          component: "picker",
          type: "date",
          default: "2020-10-12",
          format: "yyyy年MM月dd日",
          "value-format": "yyyy-MM-dd",
          rules: [{ required: true, message: "类型必选", trigger: "change" }]
        },
        {
          key: "isOpen",
          label: "仅显示差异数据",
          component: "switch",
          default: "牛逼",
          allowableValue: ["牛逼", "不牛逼"]
        },
        {
          key: "vendorCitys",
          label: "供应商所在城市",
          component: "checkboxGroup",
          options: [
            {
              areaName: "长沙",
              areaId: "长沙"
            },
            {
              areaName: "浏阳的大帅比伍宇威",
              areaId: "浏阳"
            },
            {
              areaName: "张家界",
              areaId: "张家界"
            },
            {
              areaName: "常德",
              value: "常德"
            }
          ],
          isButton: true,
          col: 2,
          mapper: {
            text: "areaName",
            value: "areaId"
          }
        }
      ]

      return {
        config
      }
    }
  })
</script>
