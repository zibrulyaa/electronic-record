import { createRouter, createWebHistory } from 'vue-router'
import TerminalPage from '@/pages/terminal/TerminalPage.vue'
import TerminalCategoryPage from '@/pages/terminal/TerminalCategoryPage.vue'
import TeminalServicePage from '@/pages/terminal/TeminalServicePage.vue'

import WindowsPage from '@/pages/window/WindowsPage.vue'

import EmployePage from '@/pages/employe/EmployePage.vue'
import EmployeWorkspacePage from '@/pages/employe/EmployeWorkspacePage.vue'

import AdministratorPage from '@/pages/administrator/AdministratorPage.vue'
import AdministratorCategoriesPage from '@/pages/administrator/AdministratorCategoriesPage.vue'
import AdministratorCategoryPage from '@/pages/administrator/AdministratorCategoryPage.vue'
import AdministratorServicePage from '@/pages/administrator/AdministratorServicePage.vue'

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
      path: ROUTER_PATHS.EMPLOYE_WORKSPACE,
      name: ROUTER_PATHS.EMPLOYE_WORKSPACE,
      component: EmployeWorkspacePage
    },
    {
      path: ROUTER_PATHS.ADMINISTRATOR,
      name: ROUTER_PATHS.ADMINISTRATOR,
      component: AdministratorPage
    },
    {
      path: ROUTER_PATHS.ADMINISTRATOR_CATEGORIES,
      name: ROUTER_PATHS.ADMINISTRATOR_CATEGORIES,
      component: AdministratorCategoriesPage
    },
    {
      path: ROUTER_PATHS.ADMINISTRATOR_CATEGORY_EDIT,
      name: ROUTER_PATHS.ADMINISTRATOR_CATEGORY_EDIT,
      component: AdministratorCategoryPage
    }
    ,
    {
      path: ROUTER_PATHS.ADMINISTRATOR_SERVICE_EDIT,
      name: ROUTER_PATHS.ADMINISTRATOR_SERVICE_EDIT,
      component: AdministratorServicePage,
    }
  ]
})

export default router
