/**
 * easy api v4.0 的导入方式
 */
import registerModule from "@xsyx/easy-api-h5";


/* Utils */
import { useLoadingHook } from "@/composition/useLoadingApi";
const { startLoading, closeLoading } = useLoadingHook()
import { ElMessage } from "element-plus";
import { IS_DEV_ENV } from "@/config/constants";
import { INJECTION_CONFIG, KYLIN_CONFIG } from "@/config/constants";
import { useSystemStoreHook } from "@/composition/useSystemStoreApi";
import { API } from "./modules";
const { states } = useSystemStoreHook()

/**
 * Http 状态码 正常返回体 标准化函数
 * @param response
 * @returns {{code: string, data: {}, success: boolean, message: string}}
 */

const standard = (response) => {
  /* eslint-disable */
  const { rspCode = "200", rspDesc = "", success } = response;
  /* easyApi 如何判断接口 成功or失败 的根本所在 */
  /* 必须符合接口返回规范，否则又要在此处理弄出一堆什么白名单... */
  return {
    code: rspCode,
    success: success,
    message: rspDesc,
    data: response
  };
};
/**
 * Http 状态码 异常返回体 标准化函数
 * @param error
 * @param params
 */
const fail = (error, params) => {
  // 全局错误处理

  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = "请求错误";
        break;
      case 401:
        error.message = "未授权，请登录";
        break;
      case 403:
        error.message = "拒绝访问";
        break;
      case 404:
        error.message = `请求地址出错: ${error.config.url}`;
        break;
      case 408:
        error.message = "请求超时";
        break;
      case 500:
        error.message = "服务器内部错误";
        break;
      case 501:
        error.message = "服务未实现";
        break;
      case 502:
        error.message = "网关错误";
        break;
      case 503:
        error.message = "服务不可用";
        break;
      case 504:
        error.message = "网关超时";
        break;
      case 505:
        error.message = "HTTP版本不受支持";
        break;
      default:
        break;
    }
  }
  const tips = error.desc || error.message;
  error.message =
    error && error.toString().indexOf("timeout") !== -1 ? "网络超时" : tips;
  /* 登录过期判断,退出登录 */
  if (error && error.response && error.response.status === 401) {
    errorLog(error, () => {
      if (IS_DEV_ENV) {
        const isBackLogin = KYLIN_CONFIG && !KYLIN_CONFIG.ignoreLoginOut;
        if (isBackLogin) {
          window.$globalOidc.signoutRedirect();
        }
      } else {
        window.$globalOidc.signoutRedirect();
      }
    });
  } else {
    errorLog(error);
  }
};

/**
 * 业务线基本配置
 */
const baseConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: async () => {
      // const oidcInfo = store ? store.getters.oidcInfo : undefined;
      // if (oidcInfo) {
      //   return `${oidcInfo.token_type} ${oidcInfo.access_token}`;
      // }
      if(states.token){
        return states.token
      }
      const sessionPortal = sessionStorage.getItem("$portal");
      const $portal = sessionPortal ? JSON.parse(sessionPortal) : {};
      if ($portal.inPortal) {
        return $portal.token;
      }
    }
  },
  loading: true,
  timeout: 30 * 1000,
  plugins: {
    loading:() => {
      startLoading();
      return () => {
        closeLoading();
      };
    }
  },
  hooks: {
    beforeFetch: [requestInterceptor],
    afterFetch: [responseInterceptor]
  }
};
/**
 * 第三方码中的 hook(url, res, params, finalOptions);
 * */
function responseInterceptor(url, res, params, finalOptions) {
  /* 无法返回 对入参的修改 */
  /* 对res的处理 easeApi 已经暴露了其它属性，请参考文档 */
}
/**
 * 第三方码中的 hook(url, undefined, params, finalOptions)
 * */
function requestInterceptor(url, undefined, params, finalOptions) {
  /* 无法返回 对入参的修改 */
  /* 对请求的加工，如加 header，直接在 headers 中添加 */
  /* easyApi 4.0 beta 10 已经提供 headers 强大的方法 */
}

/* 记录和显示错误 */
function errorLog(error, onClose = function () {}) {
  /* 添加到日志打印到控制台 */
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }
  /* 显示接口返回的业务错误提示 */
  ElMessage({
    message: error.message,
    type: "error",
    duration: 3 * 1000,
    showClose: true,
    onClose
  });
  closeLoading();
}


export const easyApi = registerModule({
  prefix: INJECTION_CONFIG.urlPrefix,
  standard,
  fail,
  module: API,
  ...baseConfig
});
