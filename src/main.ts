import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import ElementPlus from "element-plus"
import "element-plus/lib/theme-chalk/index.css"
import { APP_ENV } from "@/config/constants.js"
const app = createApp(App).use(router).use(ElementPlus).mount("#app")

console.log(APP_ENV)
