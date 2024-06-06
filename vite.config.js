import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Icons from "unplugin-icons/vite";
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
console.log(path.resolve(__dirname, 'src/assets/svg'))
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(command, mode)
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      proxy: {
        '/dev-api': {
          target: 'http://localhost:6002',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ''),
        },
      },
      host: '0.0.0.0'
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[name]',
        svgoOptions: true
      }),
      Components({
        resolvers: [
          IconsResolver(),
        ],
      }),
      Icons({
        // autoInstall: true,
      }),
    ],
    build: {
      sourcemap: true
    }
  }
})
