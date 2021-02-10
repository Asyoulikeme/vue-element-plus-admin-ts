import { _RouteRecordBase } from "vue-router"
/* Extensions */
declare module "vue-router" {
    export interface _CustomRouteRecordBase extends _RouteRecordBase {
        hidden?: boolean
        component?: RouteComponent
    }
    export type CustomRouteRecordRaw = _CustomRouteRecordBase
}

export { CustomRouteRecordRaw } from "vue-router"