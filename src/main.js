// createApp返回一个应用的实例，use注册插件的时候可以连续注册，use返回了应用实例
// vue2 中入口文件使用的是new Vue() 即一个Vue实例

import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import router from "./router"

// console.log(router)

const app = createApp(App).use(router).use(ElementPlus)


app.mount('#app')









console.log("app", app)
// console.log(createApp(App).use(router))
// console.log(createApp(App).use(router).mount('#app'))
