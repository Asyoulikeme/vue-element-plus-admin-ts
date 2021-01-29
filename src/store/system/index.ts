import { defaultRoutes } from "/@/router/routes/default-routes"
export default {
  state: {
    isCollapse: false,
    defaultRoutes: defaultRoutes
  },
  getters: {
  },
  mutations: {
    TOOGLE_SIDEBAR (state: any) {
      state.isCollapse = !(state.isCollapse);
    }
  },
  actions: {
  }
};
