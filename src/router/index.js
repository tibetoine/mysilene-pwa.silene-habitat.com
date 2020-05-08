import Vue from 'vue'
import Router from 'vue-router'
import News from '../vue/pages/news'
import Contacts from '../vue/pages/contacts'
import ContactModal from '../vue/modals/contactModal'
import NewsModal from '../vue/modals/newsModal'
import Meteo from '../vue/pages/meteo'
import Help from '../vue/pages/help'
import Docs from '../vue/pages/docs'
import Bim from '../vue/pages/bim'
import Admin from '../vue/pages/admin'
import Shifts from '../vue/pages/shifts'
import ShiftsManager from '../vue/pages/shiftsManager'
import ShiftsRH from '../vue/pages/shiftsRH'
import Home from '../vue/pages/home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/news',
      component: News
    },
    {
      path: '/contacts',
      component: Contacts,
      name: 'contacts'
    },
    {
      path: '/contacts/:id',
      component: ContactModal,
      name: 'contactModal'
    },
    {
      path: '/news/:id',
      component: NewsModal,
      name: 'newsModal'
    },
    {
      path: '/meteo',
      component: Meteo,
      name: 'meteo'
    },
    {
      path: '/help',
      component: Help,
      name: 'help'
    },
    {
      path: '/docs',
      component: Docs,
      name: 'docs'
    },
    {
      path: '/bim',
      component: Bim,
      name: 'bim'
    },
    {
      path: '/admin',
      component: Admin,
      name: 'admin'
    },
    {
      path: '/shifts',
      component: Shifts,
      name: 'shifts'
    },
    {
      path: '/gta_manager',
      component: ShiftsManager,
      name: 'shiftsManager'
    },
    {
      path: '/gta_rh',
      component: ShiftsRH,
      name: 'shiftsRH'
    },
    {
      path: '/home',
      component: Home,
      name: 'home'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  // TODO V4 - Protection des routes (ROLES)
  /* store.dispatch('fetchAccessToken')
  if (to.fullPath === '/users') {
    if (!store.state.accessToken) {
      next('/login')
    }
  }
  if (to.fullPath === '/login') {
    if (store.state.accessToken) {
      next('/users')
    }
  } */
  next()
})

export default router
