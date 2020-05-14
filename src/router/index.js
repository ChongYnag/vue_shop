import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login, auth: false },
  { path: '/home', component: Home, auth: true }
]

const router = new VueRouter({
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const isToken = window.sessionStorage.getItem("token");
  if (!isToken) return next('/login');
  next()
})

export default router
