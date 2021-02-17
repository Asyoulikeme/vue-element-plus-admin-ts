import { createApp,App as VueApp} from "vue"
import App from "./App.vue"
import router from "./router"
import ElementPlus from "element-plus"
import "element-plus/lib/theme-chalk/index.css"
import { APP_ENV } from "@/config/constants.js"
import { easyApi } from "@/api"
const app:VueApp = createApp(App)
app.config.globalProperties.$api = easyApi

app.use(router).use(ElementPlus).mount("#app")
console.log(APP_ENV)
