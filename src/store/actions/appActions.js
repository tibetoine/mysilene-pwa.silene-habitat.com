import On from '../../const/on'
import Do from '../../const/do'
import rest from '../../rest/routes'
import api from '../../rest/api'

export default {
  [On.LOAD_CONTACTS]: async function ({ commit }) {
    /* 1/ Appel REST à l'API  */
    const response = await rest.getContacts()

    const contacts = response.body

    /* 2/ Enregistrement dans le store */
    commit(Do.SET_CONTACTS, contacts)
  },

  [On.LOAD_NEWS]: async function ({ commit }) {
    const response = await rest.getNews()

    const news = response.body

    commit(Do.SET_NEWS, news)
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
      api.setDefaultAuthorization(token)

      localStorage.setItem('user-token', token)
      localStorage.setItem('user-id', user.userId)
      commit(Do.LOGIN_SUCCESS, response.body)
      commit(Do.LOGIN_STOP)
      /* Dispatch Action */
      dispatch(On.LOAD_NEWS)
      dispatch(On.LOAD_CONTACTS)
      dispatch(On.LOAD_WEATHER)
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
    dispatch(On.LOAD_NEWS)
    dispatch(On.LOAD_CONTACTS)
  },
  [On.LOGIN_WAITING]: function ({ commit }) {
    commit(Do.LOGIN_WAITING)
  },
  [On.LOGIN_STOP]: function ({ commit }) {
    commit(Do.LOGIN_STOP)
  }

}
