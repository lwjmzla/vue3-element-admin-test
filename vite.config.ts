import { ConfigEnv, UserConfig, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';


const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    resolve: {
      alias: {
        "@": pathSrc,
      },
    },
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],
        eslintrc: {
          enabled: false, // !是否自动生成 eslint 规则，第一次执行设为true，会生成.eslintrc-auto-import.json文件，建议生成之后设置 false，当需要更新配置文件的时候，再重新打开
          filepath: "./.eslintrc-auto-import.json", // 指定自动导入函数 eslint 规则的文件
        },
        dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"), // !自动生成并导入vue等函数TS类型声明文件路径
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver({ importStyle: 'sass' }), // !修改主题变量样式
          // 自动导入图标组件
          IconsResolver({}),
        ],
        vueTemplate: true, // 是否在 vue 模板中自动导入
      }),
      Components({
        dts: path.resolve(pathSrc, "types", "components.d.ts"), // !自动生成并导入src/components等组件TS类型声明文件路径
        // !指定自动导入的组件位置，默认是 src/components
        // dirs: ['src/components'],
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver({ importStyle: 'sass' }), // !修改主题变量样式
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"] // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
          }),
        ],
      }),
      Icons({
        // 自动安装图标库
        autoInstall: true,
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        //define global scss variable
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    build: {
      rollupOptions: {
        // manualChunks: { // !@deprecated — Use the "manualChunks" output option instead.应该使用下面的'output.manualChunks'
        //   vue: ['vue'] // !可以多个['vue', 'lodash']
        // }
        // manualChunks(id) { // !如果有多个node_modules的依赖需要单独抽
        //   //console.log(id)
        //   if (id.includes('node_modules')) {
        //     return 'vendor' // !包名
        //   }
        // }
        output: {
          manualChunks: {
            vue: ['vue'] // !可以多个['vue', 'lodash']
          }
        }
      }
      
    },
  }
})
