import { createRouter, createWebHistory } from 'vue-router'
import TerminalPage from '@/pages/TerminalPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TerminalPage
    },

  ]
})

export default router
