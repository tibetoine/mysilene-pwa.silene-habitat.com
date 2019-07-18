import On from '../../const/on'
import Do from '../../const/do'
import rest from '../../rest/routes'
import api from '../../rest/api'

export default {
  [On.LOAD_CONTACTS]: async function ({ commit }) {
    /* 1/ Appel REST à l'API  */
    try {
      const response = await rest.getContacts()
      if (response.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      } else {
        const contacts = response.body
        /* 2/ Enregistrement dans le store */
        commit(Do.SET_CONTACTS, contacts)
      }
    } catch (error) {
      if (error && error.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      }
    }
  },
  [On.HEALTHCHECK]: async function ({ commit }) {
    try {
      const response = await rest.healthcheck()
      if (response.status !== 200) {
        commit(Do.SET_DOWN, 'ERREUR - Serveur API répond en ' + response.status)
      } else {
        if (response.body && response.body.mongo === 'KO') {
          commit(Do.SET_DOWN, 'ERREUR - La base de données Mongo semble KO' + response)
        } else {
          commit(Do.SET_UP)
        }
      }
    } catch (error) {
      console.log('error : ', error)
      commit(Do.SET_DOWN, 'ERREUR - Serveur API Down - appel impossible à healthcheck')
    }
  },
  [On.LOAD_DOCS]: async function ({ commit }) {
    try {
      const response = await rest.getDocs()
      if (response.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      } else {
        const docs = response.body
        /* 2/ Enregistrement dans le store */
        commit(Do.SET_DOCS, docs)
      }
    } catch (error) {
      if (error && error.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      }
    }
  },
  [On.LOAD_PREFS]: async function ({ commit }) {
    var userId = localStorage.getItem('user-id')
    try {
      const response = await rest.getUsers(userId)
      if (response.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      } else {
        const user = response.body
        console.log('***************** user : ', user)

        /* Traitement des Prefs (Existe , existe pas ?) */
        var prefs = user.prefs
        if (prefs == null || prefs === undefined || prefs.length === 0) {
        /* Charge les prefs par défaut en base puis en local */
          prefs = ['actualites', 'flashInfo', 'mouvementsRH', 'twitter', 'cos-rss', 'cosActu', 'cosNews', 'docs']
          /* Charge les valeurs par défaut en base */
          await rest.putUsers(userId, prefs)
        }
        /* 2/ Enregistrement dans le store */

        commit(Do.SET_PREFS, prefs)
      }
    } catch (error) {
      if (error && error.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      }
    }
  },
  [On.SAVE_PREFS]: async function ({ commit, state }) {
    var prefs = state.news.selectedTypes
    var userId = localStorage.getItem('user-id')
    try {
      const response = await rest.putUsers(userId, prefs)
      if (response.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      } else {
        /* Console */
        console.log('OK prefs enregistré en base', prefs)
      }
    } catch (error) {
      if (error && error.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      }
    }

    /* Sauvegarde en State --> LOL pas nécessaire c'est déjà enregistré depuis la filterDialog ? */
    // commit(Do.SET_PREFS, prefs)
  },
  [On.LOAD_NEWS]: async function ({ commit }) {
    try {
      const response = await rest.getNews()
      if (response.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      } else {
        const news = response.body
        commit(Do.SET_NEWS, news)
      }
    } catch (error) {
      if (error && error.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      }
    }
  },

  [On.LOAD_WEATHER]: async function ({ commit }) {
    const response = await rest.getLastWeather()

    const lastWeather = response.body

    commit(Do.SET_WEATHER, lastWeather)
  },

  [On.UPDATE_FILTERED_CONTACTS]: function ({commit}) {
    commit(Do.UPDATE_FILTERED_CONTACTS)
    commit(Do.SHOW_MORE_CONTACTS)
  },
  [On.UPDATE_FILTERED_NEWS]: function ({commit}) {
    commit(Do.UPDATE_FILTERED_NEWS)
    commit(Do.SHOW_MORE_NEWS)
  },

  [On.LOGIN]: async function ({commit, dispatch}, user) {
    var callbackError = error => {
      var message = 'Authentification impossible!'
      if (error.body && error.body.message) {
        message = error.body.message
      } else {
        console.log(error)
      }
      /* Suppression du user-token si existe */
      localStorage.removeItem('user-token')

      /* Suppression Header d'Authorization par defaut */
      api.deleteDefaultAuthorization()

      commit(Do.LOGIN_FAIL, message)
      // console.log('commit(Do.LOG_ERROR_ON_CLIENT, error.response)')
      commit(Do.LOG_ERROR_ON_CLIENT, error.body)
      commit(Do.LOGIN_STOP)
    }

    var callbackSuccess = response => {
      /* Mise à jour du Local Storage */
      const token = response.body.token

      /* Header d'Authorization par defaut */
      var userId = user.userId.trim().toLowerCase()
      api.setDefaultAuthorization(token, userId)

      localStorage.setItem('user-token', token)
      localStorage.setItem('user-id', userId)
      commit(Do.LOGIN_SUCCESS, response.body)
      commit(Do.LOGIN_STOP)
      /* Dispatch Action */
      dispatch(On.LOAD_PREFS)
      dispatch(On.LOAD_NEWS)
      dispatch(On.LOAD_CONTACTS)
      dispatch(On.LOAD_DOCS)
    }

    await rest.login(user, callbackSuccess, callbackError)
  },
  [On.LOGOUT]: async function ({ commit }, user) {
    /* Suppression du user-token si existe */
    localStorage.removeItem('user-token')
    commit(Do.LOGOUT)
  },
  [On.AUTO_LOGIN]: async function ({ commit, dispatch }, user) {
    commit(Do.LOGIN_SUCCESS, user)

    /* Dispatch Action */
    dispatch(On.LOAD_PREFS)
    dispatch(On.LOAD_NEWS)
    dispatch(On.LOAD_CONTACTS)
    dispatch(On.LOAD_DOCS)
  },
  [On.LOGIN_WAITING]: function ({ commit }) {
    commit(Do.LOGIN_WAITING)
  },
  [On.LOGIN_STOP]: function ({ commit }) {
    commit(Do.LOGIN_STOP)
  }

}
