/* Extensions Types */
import { _RouteRecordBase } from "vue-router"
import { AxiosInstance } from 'axios';

declare module "vue-router" {
    interface _CustomRouteRecordBase extends _RouteRecordBase {
        hidden?: boolean
        component?: RouteComponent
    }
     type CustomRouteRecordRaw = _CustomRouteRecordBase
}


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: AxiosInstance | any;
  }
}



