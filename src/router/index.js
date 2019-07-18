import Vue from 'vue'
import Router from 'vue-router'
import News from '../vue/pages/news'
import Contacts from '../vue/pages/contacts'
import ContactModal from '../vue/modals/contactModal'
import NewsModal from '../vue/modals/newsModal'
import Meteo from '../vue/pages/meteo'
import Help from '../vue/pages/help'
import Docs from '../vue/pages/docs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: News
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
    }

  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
