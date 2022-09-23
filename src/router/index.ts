import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginViews.vue'),
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/RegistrationViews.vue'),
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/MainViews.vue'),
    // eslint-disable-next-line consistent-return
    beforeEnter() {
      if (!store.state.isAuth) {
        return { name: 'Login' }
      }
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
