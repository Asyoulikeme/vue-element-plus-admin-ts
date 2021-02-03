import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import ElementPlus from "element-plus"
import "element-plus/lib/theme-chalk/index.css"
import {
  NODE_ENV,
  APP_ENV,
  APP_NAME,
  APP_VERSION
} from "/@/config/constants.js"
const app = createApp(App).use(router).use(ElementPlus).mount("#app")

console.log(NODE_ENV, APP_ENV, APP_NAME, APP_VERSION)
