# VUE-ELEMENT-PLUS-ADMIN-TS


<p align="center">
<a href="https://npmjs.com/package/vite"><img src="https://img.shields.io/npm/v/vite.svg" alt="npm package"></a>
<a href="https://nodejs.org/en/about/releases/"><img src="https://img.shields.io/node/v/vite.svg" alt="node compatility"></a>

<a href="https://github.com/vuejs/vue-next">
    <img src="https://img.shields.io/badge/vue--next-latest-green">
</a>
<a href="https://github.com/vuejs/vue-router-next">
    <img src="https://img.shields.io/badge/vue--router--next-latest-orange">
</a>
<a href="https://github.com/element-plus/element-plus">
    <img src="https://img.shields.io/badge/element--plus-latest-blue">
</a>
</p>

This App template use vuenext + vue-router + elementPlus + typescript + vite 

For future 面向未来的开发方案,默认配置兼容到支持 script module 方式的浏览器

## Install 安装依赖
```bash
npm i
```
## Dev 运行项目
```bash
npm run dev
```
> 运行原生vite 本地serve命令
```bash
npm run start
```
> 运行基于vite工具二次开发的脚手架 本地serve命令
## Build 构建项目
```bash
npm run build
```
> 运行原生vite build命令

```bash
npm run dist
```
> 运行基于vite工具二次开发的脚手架 build命令


## Reference

[vite指南](https://vitejs.dev/guide)
[vue3中文文档](https://www.vue3js.cn/)
[element-ui plus文档](https://element-plus.org/)
[vue-router next](https://next.router.vuejs.org/api/)

> 中文文档的翻译中任然存在问题，发现疑点时请自行参考英文文档


element-ui 按需引入备忘文档


```js
const components = [
  ElAffix,
  ElAlert,
  ElAside,
  ElAutocomplete,
  ElAvatar,
  ElBacktop,
  ElBadge,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElButtonGroup,
  ElCalendar,
  ElCard,
  ElCarousel,
  ElCarouselItem,
  ElCascader,
  ElCascaderPanel,
  ElCheckbox,
  ElCheckboxButton,
  ElCheckboxGroup,
  ElCol,
  ElCollapse,
  ElCollapseItem,
  ElCollapseTransition,
  ElColorPicker,
  ElContainer,
  ElDatePicker,
  ElDialog,
  ElDivider,
  ElDrawer,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElEmpty,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElImage,
  ElImageViewer,
  ElInput,
  ElInputNumber,
  ElLink,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElOptionGroup,
  ElPageHeader,
  ElPagination,
  ElPopconfirm,
  ElPopover,
  ElPopper,
  ElProgress,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElRate,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSlider,
  ElStep,
  ElSteps,
  ElSubmenu,
  ElSwitch,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTag,
  ElTimePicker,
  ElTimeSelect,
  ElTimeline,
  ElTimelineItem,
  ElTooltip,
  ElTransfer,
  ElTree,
  ElUpload,
  ElVirtualList,
  ElSpace,
  ElSkeleton,
  ElSkeletonItem,
]

const plugins = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
]
```