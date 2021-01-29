import { defineConfig } from 'vite'
const path = require("path")
import vue from '@vitejs/plugin-vue'
import { babel } from '@rollup/plugin-babel';

export default defineConfig({
  plugins: [
    vue(),
    babel({ 
      babelHelpers: 'bundled',
      exclude:"node_module/**"
    }),
  ],
  alias: {
    '/@': path.resolve(__dirname, './src')
  },
})


