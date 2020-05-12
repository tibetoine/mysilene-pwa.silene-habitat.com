import Vue from 'vue'
import Router from 'vue-router'
import News from '../vue/pages/news'
import Contacts from '../vue/pages/contacts'
import ContactModal from '../vue/modals/contactModal'
import NewsModal from '../vue/modals/newsModal'
import Meteo from '../vue/pages/meteo'
import Help from '../vue/pages/help'
import Admin from '../vue/pages/admin'
import Forbidden from '../vue/pages/forbidden'
import Shifts from '../vue/pages/shifts'
import ShiftsManager from '../vue/pages/shiftsManager'
import ShiftsRH from '../vue/pages/shiftsRH'
import Home from '../vue/pages/home'
import store from '../store/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      component: Home,
      name: 'home'
    },
    {
      path: '/403',
      component: Forbidden,
      name: 'forbidden'
    },
    {
      path: '/news',
      component: News,
      name: 'news',
      beforeEnter: checkAuthAndRights
    },
    {
      path: '/contacts',
      component: Contacts,
      name: 'contacts',
      beforeEnter: checkAuthAndRights
    },
    {
      path: '/contacts/:id',
      component: ContactModal,
      name: 'contactModal',
      beforeEnter: checkAuthAndRights
    },
    {
      path: '/news/:id',
      component: NewsModal,
      name: 'newsModal',
      beforeEnter: checkAuthAndRights
    },
    {
      path: '/meteo',
      component: Meteo,
      name: 'meteo',
      beforeEnter: checkAuthAndRights
    },
    {
      path: '/help',
      component: Help,
      name: 'help',
      beforeEnter: checkAuthAndRights
    },
    {
      path: '/admin',
      component: Admin,
      name: 'admin',
      beforeEnter: checkAuthAndRights
    },
    {
      path: '/shifts',
      component: Shifts,
      name: 'shifts',
      beforeEnter: checkAuthAndRights
    },
    {
      path: '/gta_manager',
      component: ShiftsManager,
      name: 'shiftsManager',
      beforeEnter: checkAuthAndRights
    },
    {
      path: '/gta_rh',
      component: ShiftsRH,
      name: 'shiftsRH',
      beforeEnter: checkAuthAndRights
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

/**
 * Vérifie qu'un utilisateur est authentifié.
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
function checkAuthAndRights(to, from, next) {
  console.log('i m here ', to, from, next)
  /**
   * Determines where we should send the user.
   */
  function checkAuthenticateAndRights() {
    /* Si l'utilisateur est auth alors on regarde où on l'envoie */
    if (!store.getters.isAuthenticate) {
      console.log(`l'utilisateur n'est pas authentifié`)
      next('/home')
    } else {
      if (!store.getters.isAccessDataLoaded) {
        /* En attente que l'utilisateur soit authentifié */
        store.watch(
          () => store.getters.isAccessDataLoaded,
          (isAccessDataLoaded) => {
            console.log('watched: ', isAccessDataLoaded)
            checkRights()
          }
        )
      } else {
        checkRights()
      }
    }
  }

  /**
   * Vérifie les droits pour la ressource demandée
   * @param {*} component
   */
  function checkRights() {
    /* Vérifie les droits */
    console.log('Vérification des droits pour ', to.name)

    if (!to.name) {
      console.error(
        'Attention erreur dans la configuration, il faut un nom pour la route'
      )
    }
    console.log(
      'store.state.access.permissionsListInBase',
      store.state.access.permissionsListInBase
    )
    console.log('store.state.login.roles', store.state.login.roles)

    let hasRight = false
    store.state.access.permissionsListInBase.forEach((permission) => {
      if (permission._id === to.name) {
        console.log(permission)
        permission.roles.forEach((roleAttendu) => {
          console.log('roleAttendu', roleAttendu._id)
          if (store.state.login.roles.includes(roleAttendu._id)) {
            console.log(
              'Utilisateur autorisé pour la page [%s] avec le role [%s]',
              to.name,
              roleAttendu._id
            )
            hasRight = true
          }
        })
      }
    })
    if (hasRight) {
      next()
    } else {
      next('/403')
    }
  }

  /* Confirms the user has been loaded */
  if (!store.getters.isAuthenticate) {
    /* En attente que l'utilisateur soit authentifié */
    store.watch(
      () => store.getters.isAuthenticate,
      (isAuthenticate) => {
        console.log('watched: ', isAuthenticate)
        checkAuthenticateAndRights()
      }
    )
  } else {
    checkAuthenticateAndRights()
  }

  // next()
}
// router.beforeEach((to, from, next) => {})

export default router
