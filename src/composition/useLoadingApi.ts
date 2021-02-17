
import { ElLoading } from "element-plus"
import { ILoadingInstance } from "../../node_modules/element-plus/lib/el-loading/src/loading.type"
export const useLoadingHook = () => {
    const loadingInstance:ILoadingInstance | null = null

    function startLoading(text?:string){
        ElLoading.service({
            lock: true,
            text: text || '拼命加载中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    }

    function closeLoading(){
        loadingInstance && (loadingInstance as ILoadingInstance).close()
    }

    return {
        startLoading,
        closeLoading
    }
}