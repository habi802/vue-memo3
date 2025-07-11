import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Form from '@/views/Form.vue'
import Detail from '@/views/Detail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/add',
      name: 'Form',
      component: Form,
    },
    {
      path: '/:memoId',
      name: 'Detail',
      component: Detail,
    },
  ],
})

export default router
