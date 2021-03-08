import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { babel } from "@rollup/plugin-babel"
const path = require("path")

// dev 配置
export default defineConfig({
  plugins: [
    vue(),
    // babel({
    //   babelHelpers: "bundled",
    //   exclude: "node_module/**"
    // })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "127.0.0.1",
    port: 9527,
    open: true,
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path: any) => path.replace(/^\/api/, '')
      }
    }
  }
})