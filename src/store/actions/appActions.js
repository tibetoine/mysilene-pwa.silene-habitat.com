import On from '../../const/on'
import Do from '../../const/do'
import rest from '../../rest/routes'
import api from '../../rest/api'
import { getShiftTypeById } from '../../shared/helper'

export default {
  [On.LOAD_CONTACTS]: async function({ commit }) {
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
  [On.LOAD_USERS]: async function({ commit }) {
    /* 1/ Appel REST à l'API  */
    try {
      const response = await rest.getUsers()
      if (response.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      } else {
        const users = response.body
        /* 2/ Enregistrement dans le store */
        commit(Do.SET_USERS, users)
      }
    } catch (error) {
      if (error && error.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      }
    }
  },
  [On.HEALTHCHECK]: async function({ commit }) {
    try {
      const response = await rest.healthcheck()
      if (response.status !== 200) {
        commit(Do.SET_DOWN, 'ERREUR - Serveur API répond en ' + response.status)
      } else {
        if (response.body && response.body.mongo === 'KO') {
          commit(
            Do.SET_DOWN,
            'ERREUR - La base de données Mongo semble KO' + response
          )
        } else {
          commit(Do.SET_UP)
        }
      }
    } catch (error) {
      console.error('error healthcheck : ', error)
      commit(
        Do.SET_DOWN,
        'ERREUR - Serveur API Down - appel impossible à healthcheck'
      )
    }
  },
  [On.LOAD_DOCS]: async function({ commit }) {
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
  [On.LOAD_SHIFTS]: async function({ commit }) {
    var userId = localStorage.getItem('user-id')
    try {
      const response = await rest.getShifts(userId)
      let data = response.data
      var someShifts = data.map(shiftsMap)
      commit(Do.SET_SHIFTS, someShifts)
    } catch (error) {
      if (error && error.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      }
    }
  },
  [On.LOAD_PREFS]: async function({ commit }) {
    var userId = localStorage.getItem('user-id')
    try {
      const response = await rest.getUser(userId)
      if (response.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      } else {
        const user = response.body

        /* Traitement des Prefs (Existe , existe pas ?) */
        var prefs = user.prefs
        if (prefs == null || prefs === undefined || prefs.length === 0) {
          /* Charge les prefs par défaut en base puis en local */
          prefs = [
            'actualites',
            'flashInfo',
            'mouvementsRH',
            'twitter',
            'cos-rss',
            'cosActu',
            'cosNews',
            'docs'
          ]
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
  [On.IS_ADMIN]: async function({ commit, state }) {
    var userId = localStorage.getItem('user-id')
    try {
      const response = await rest.isAdmin(userId)
      if (response.status === 204) {
        state.login.isAdmin = true
      } else {
        state.login.isAdmin = false
      }
    } catch (error) {
      // Je ne sais pas quoi faire si y'a une erreur à ce stade
      state.login.isAdmin = false
      console.error('error dans le isAdmin', error)
    }
  },
  [On.DELETE_USER]: async function({ commit, dispatch }, username) {
    // console.log('OUIIIIIII !!! ', username)
    try {
      const response = await rest.deleteUser(username)
      if (response.status === 200) {
        commit(Do.DELETE_USER_SUCCESS)
        dispatch(On.LOAD_USERS)
      } else {
        commit(Do.DELETE_USER_ERROR)
      }
    } catch (error) {
      commit(Do.DELETE_USER_ERROR)
    }
  },
  [On.SAVE_PREFS]: async function({ commit, state }) {
    var prefs = state.news.selectedTypes
    var userId = localStorage.getItem('user-id')
    try {
      const response = await rest.putUsers(userId, prefs)
      if (response.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      } else {
        /* Console */
        // console.log('OK prefs enregistré en base', prefs)
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
  [On.LOAD_NEWS]: async function({ commit }) {
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

  [On.LOAD_WEATHER]: async function({ commit }) {
    const response = await rest.getLastWeather()

    const lastWeather = response.body

    commit(Do.SET_WEATHER, lastWeather)
  },
  [On.SAVE_SHIFT]: async function({ commit, dispatch }, { user, shift }) {
    var response
    try {
      response = await rest.putShift(user.userId, shift)
    } catch (error) {
      let errorMessage = `#Shift001 - Erreur lors de l'enregisrement`
      console.error('#Shift001 - error saving shift', error)
      commit(Do.SHOW_SHIFT_ERROR, errorMessage)
      return
    }

    const updatedShift = response.body

    commit(Do.SET_CURRENT_SHIFT, updatedShift)
    commit(Do.HIDE_SHIFT_DIALOG)
    commit(Do.SHOW_SHIFT_SUCCESS, 'Votre créneau a bien été enregistré')
    dispatch(On.LOAD_SHIFTS)
  },
  [On.DELETE_SHIFT]: async function({ commit, dispatch }, shiftId) {
    try {
      await rest.deleteShift(shiftId)
    } catch (error) {
      let errorMessage = `#Shift002 - Erreur lors de la suppression`
      console.error('#Shift002 - error deleting shift', error)
      commit(Do.SHOW_SHIFT_ERROR, errorMessage)
      return
    }
    commit(
      Do.SHOW_SHIFT_SUCCESS,
      'Les informations pour cette journée ont été supprimées'
    )
    dispatch(On.LOAD_SHIFTS)
  },
  [On.DELETE_DETAILS]: async function({ commit, dispatch }, detailId) {
    try {
      await rest.deleteDetail(detailId)
    } catch (error) {
      let errorMessage = `#Shift003 - Erreur lors de la suppression d'un détail`
      console.error('#Shift003 - error deleting detail', error)
      commit(Do.SHOW_SHIFT_ERROR, errorMessage)
      return
    }
    commit(Do.SHOW_SHIFT_SUCCESS, 'Activité supprimée')
    dispatch(On.LOAD_SHIFTS)
  },

  [On.UPDATE_FILTERED_CONTACTS]: function({ commit }) {
    commit(Do.UPDATE_FILTERED_CONTACTS)
    commit(Do.SHOW_MORE_CONTACTS)
  },
  [On.UPDATE_FILTERED_NEWS]: function({ commit }) {
    commit(Do.UPDATE_FILTERED_NEWS)
    commit(Do.SHOW_MORE_NEWS)
  },

  [On.LOGIN]: async function({ commit, dispatch }, user) {
    var callbackError = error => {
      var message = 'Authentification impossible!'
      if (error.body && error.body.message) {
        message = error.body.message
      } else {
        console.error(error)
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
      const userId = response.body._id.trim().toLowerCase()

      /* Header d'Authorization par defaut */
      // var userId = user.userId.trim().toLowerCase()
      api.setDefaultAuthorization(token, userId)

      localStorage.setItem('user-token', token)
      localStorage.setItem('user-id', userId)
      commit(Do.LOGIN_SUCCESS, response.body)
      commit(Do.LOGIN_STOP)
      /* Dispatch Action */
      dispatch(On.IS_ADMIN)
      dispatch(On.LOAD_PREFS)
      dispatch(On.LOAD_NEWS)
      dispatch(On.LOAD_CONTACTS)
      dispatch(On.LOAD_DOCS)
    }

    await rest.login(user, callbackSuccess, callbackError)
  },
  [On.LOGOUT]: async function({ commit }, user) {
    /* Suppression du user-token si existe */
    localStorage.removeItem('user-token')
    commit(Do.LOGOUT)
  },
  [On.AUTO_LOGIN]: async function({ commit, dispatch }, user) {
    commit(Do.LOGIN_SUCCESS, user)

    /* Dispatch Action */
    dispatch(On.IS_ADMIN)
    dispatch(On.LOAD_PREFS)
    dispatch(On.LOAD_NEWS)
    dispatch(On.LOAD_CONTACTS)
    dispatch(On.LOAD_DOCS)
  },
  [On.LOGIN_WAITING]: function({ commit }) {
    commit(Do.LOGIN_WAITING)
  },
  [On.LOGIN_STOP]: function({ commit }) {
    commit(Do.LOGIN_STOP)
  }
}

/**
 * Transforme ce qui vient de mongo vers un objet exploitable côté client.
 * @param {*} element
 */
function shiftsMap(element) {
  let times = calculateTimes(element.details)
  let returnObject = {
    _id: element._id,
    date: element.date,
    total_time: times.total_time,
    worked_time: times.worked_time,
    not_worked_time: times.not_worked_time,
    nb_creneaux: element.details.length,
    blocked: element.blocked,
    details: element.details
  }
  return returnObject
}
/**
 * Retourne les temps calculés pour le shift passé en parametre.
 * @param {*} details
 */
function calculateTimes(details) {
  let totalTime = 0
  let workedTime = 0
  let notWorkedTime = 0

  for (let index = 0; index < details.length; index++) {
    const element = details[index]

    if (!element.time) {
      continue
    }
    let type = getShiftTypeById(element.type)
    totalTime += stringToMinutes(element.time)
    switch (type) {
      case 'conges':
        notWorkedTime += stringToMinutes(element.time)
        break
      case 'travail':
        workedTime += stringToMinutes(element.time)
        break
      case 'autre':
        notWorkedTime += stringToMinutes(element.time)
        break
      default:
        console.error('calculateTimes - switch default : ', type)
        break
    }
  }

  let returnObject = {
    total_time: minuteToString(totalTime),
    worked_time: minuteToString(workedTime),
    not_worked_time: minuteToString(notWorkedTime)
  }
  return returnObject
}

function stringToMinutes(minutesString) {
  let min = 0
  let times = minutesString.split(':')
  min = parseInt(times[0]) * 60 + parseInt(times[1])
  return min
}

function minuteToString(minutes) {
  let hours = Math.trunc(minutes / 60)
  if (hours < 10) hours = '0' + hours
  let min = minutes % 60
  if (min < 10) min = '0' + min
  return `${hours}:${min}`
}
