import On from '../../const/on'
import Do from '../../const/do'
import rest from '../../rest/routes'

export default {
  [On.LOAD_CONTACTS]: async function ({ commit }) {
    /* 1/ Appel REST à l'API  */
    const contacts = await rest.getContacts()

    /* 2/ Enregistrement dans le store */
    commit(Do.SET_CONTACTS, contacts)
  },

  [On.LOAD_NEWS]: async function ({ commit }) {
    commit(Do.SET_NEWS, await rest.getNews())
  },

  [On.LOAD_WEATHER]: async function ({ commit }) {
    commit(Do.SET_WEATHER, await rest.getLastWeather())
  },

  [On.UPDATE_FILTERED_CONTACTS]: function ({commit}) {
    commit(Do.UPDATE_FILTERED_CONTACTS)
    commit(Do.SHOW_MORE_CONTACTS)
  },

  [On.LOGIN]: async function ({commit}, user) {
    var callbackError = error => {
      console.log('Action : LOGIN FAILURE')
      console.log(error)
      var message = 'Authentification impossible!'
      if (error.response && error.response.message) {
        message = error.response.message
      }

      commit(Do.LOGIN_FAIL, message)
      console.log('commit(Do.LOG_ERROR_ON_CLIENT, error.response)')
      commit(Do.LOG_ERROR_ON_CLIENT, error.response)
    }

    var callbackSuccess = response => {
      // TODO Enregistre le token en local.
      console.log('Action : LOGIN SUCCESS')
      commit(Do.LOGIN_SUCCESS, response)
    }

    commit(Do.LOGIN, user, await rest.login(user, callbackSuccess, callbackError))
  }
}
