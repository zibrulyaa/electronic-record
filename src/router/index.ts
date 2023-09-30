import { createRouter, createWebHistory } from 'vue-router'
import TerminalPage from '@/pages/TerminalPage.vue'
import TerminalCategoryPage from '@/pages/TerminalCategoryPage.vue'
import TeminalServicePage from '@/pages/TeminalServicePage.vue'
import WindowsPage from '@/pages/WindowsPage.vue'
import EmployePage from '@/pages/EmployePage.vue'
import AdministratorPage from '@/pages/AdministratorPage.vue'

import { ROUTER_PATHS } from '@/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTER_PATHS.TERMNINAL,
      name: ROUTER_PATHS.TERMNINAL,
      component: TerminalPage
    },
    {
      path: ROUTER_PATHS.CATEGORIES,
      name: ROUTER_PATHS.CATEGORIES,
      component: TerminalCategoryPage
    },
    {
      path: ROUTER_PATHS.SERVICES,
      name: ROUTER_PATHS.SERVICES,
      component: TeminalServicePage
    },
    {
      path: ROUTER_PATHS.WINDOWS,
      name: ROUTER_PATHS.WINDOWS,
      component: WindowsPage
    },
    {
      path: ROUTER_PATHS.EMPLOYE,
      name: ROUTER_PATHS.EMPLOYE,
      component: EmployePage
    },
    {
      path: ROUTER_PATHS.ADMINISTRATOR,
      name: ROUTER_PATHS.ADMINISTRATOR,
      component: AdministratorPage
    },
  ]
})

export default router
