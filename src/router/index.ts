import { createRouter, createWebHashHistory } from "vue-router"
import routes from "./routes/index"
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css'
// NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.onError(() => {
  console.log("error route")
})

router.beforeEach(async (to, from, next) => {
  document.title = (to.meta && to.meta.title) || "待替换"

  next()
})
router.afterEach(() => {})

export default router
