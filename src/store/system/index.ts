import { default as allRoutes } from "/@/router/routes/index"
export default {
  state: {
    isCollapse: false,
    allRoutes: allRoutes
  },
  getters: {},
  mutations: {
    TOOGLE_SIDEBAR(state: any) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
