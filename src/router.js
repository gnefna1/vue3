import { createWebHashHistory, createRouter } from "vue-router"
import Home from "./pages/Home"
// import Register from "./pages/Register"
const routes = [
  {
    path: "/register",
    component: () => import('./pages/Register.vue')
  },
  {
    path: "/Login",
    component: () => import('./pages/Login.vue')
  },
  {
    path: "/",
    component: Home
  },
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router