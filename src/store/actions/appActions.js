import On from '../../const/on'
import Do from '../../const/do'
import rest from '../../rest/routes'
import api from '../../rest/api'
import { getShiftTypeById } from '../../shared/helper'

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
  [On.LOAD_GROUPS]: async function ({ commit }) {
    try {
      const response = await rest.getGroups()
      if (response.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      } else {
        const groups = response.body
        /* 2/ Enregistrement dans le store */
        commit(Do.SET_GROUPS, groups)
      }
    } catch (error) {
      if (error && error.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      }
    }
  },
  [On.LOAD_USERS]: async function ({ commit }) {
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
  [On.HEALTHCHECK]: async function ({ commit }) {
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
  [On.LOAD_SHIFTS]: async function ({ commit, state }) {
    // var userId = localStorage.getItem('user-id')
    let currentShiftUserId = null
    var currentShiftUser = state.shift.currentShiftUser
    if (currentShiftUser == null) {
      currentShiftUserId = localStorage.getItem('user-id')
    } else {
      currentShiftUserId = currentShiftUser.userId
    }
    try {
      const response = await rest.getShifts(currentShiftUserId)
      let data = response.data
      var someShifts = data.map(shiftsMap)
      commit(Do.SET_SHIFTS, someShifts)
    } catch (error) {
      if (error && error.status === 401) {
        localStorage.removeItem('user-token')
        commit(Do.LOGOUT)
      } else {
        console.error(
          'Impossible de charger correctement les activités ',
          error
        )
      }
    }
  },
  [On.LOAD_PREFS]: async function ({ commit }) {
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
  [On.GET_ROLES]: async function ({ commit, state }) {
    var userId = localStorage.getItem('user-id')
    try {
      const response = await rest.getRoles(userId)
      if (response.status === 200) {
        state.login.roles = response.data
      }
    } catch (error) {
      // Je ne sais pas quoi faire si y'a une erreur à ce stade
      state.login.roles = []
      console.error(
        'error dans récupération des rôles pour cet utilisateur ',
        error
      )
    }
  },
  [On.GET_CHILDREN]: async function ({ commit, state }) {
    var userId = localStorage.getItem('user-id')
    try {
      /* Si Manager */
      var response
      // console.log('state.login.roles', state.login.roles)
      if (state.login.roles.includes('rh')) {
        response = await rest.getAllChildren(userId)
      } else if (state.login.roles.includes('manager')) {
        response = await rest.getChildren(userId)
      }
      if (!response) {
        return
      }
      if (response.status === 200) {
        state.shift.managerChildren = response.data
      }
    } catch (error) {
      // Je ne sais pas quoi faire si y'a une erreur à ce stade
      state.shift.managerChildren = []
      console.error(
        'error dans récupération des collaborateur de  ',
        userId,
        error
      )
    }
  },
  [On.GET_CONTACT]: async function ({ commit, state }, username) {
    try {
      const response = await rest.getContact(username)

      if (response.status === 200) {
        state.login.currentContact = response.data
        if (!state.shift.currentShiftUser) {
          /* L'utilisateur par défaut pour la saisie des temps est l'utilisateur courant */
          let chosenUser = {
            userId: state.login.currentContact.sAMAccountName,
            avatar: getAvatar(state.login.currentContact),
            name:
              state.login.currentContact.givenName +
              ' ' +
              state.login.currentContact.sn
          }
          commit(Do.SET_CHOSEN_USER, chosenUser)
        }
      }
    } catch (error) {
      // Je ne sais pas quoi faire si y'a une erreur à ce stade
      state.login.currentContact = []
      console.error(
        'error dans récupération des infos de contacts pour ',
        username,
        error
      )
    }
  },
  [On.DELETE_USER]: async function ({ commit, dispatch }, username) {
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
  [On.SAVE_SHIFT]: async function ({ commit, dispatch }, { user, shift }) {
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
  [On.DELETE_SHIFT]: async function ({ commit, dispatch }, shiftId) {
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
  [On.DELETE_DETAILS]: async function ({ commit, dispatch }, detailId) {
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
  [On.EXTRACT_ALL]: async function ({ commit, dispatch }) {
    let response
    try {
      response = await rest.extractAll()
    } catch (error) {
      let errorMessage = `#ApiShift008 - Erreur lors de l'extraction`
      console.error('#ApiShift008 - error extracting', error)
      commit(Do.SHOW_SHIFT_ERROR, errorMessage)
      return
    }
    commit(Do.SHOW_SHIFT_SUCCESS, 'Extraction réussie')
    return response
  },

  [On.UPDATE_FILTERED_CONTACTS]: function ({ commit }) {
    commit(Do.UPDATE_FILTERED_CONTACTS)
    commit(Do.SHOW_MORE_CONTACTS)
  },
  [On.UPDATE_FILTERED_NEWS]: function ({ commit }) {
    commit(Do.UPDATE_FILTERED_NEWS)
    commit(Do.SHOW_MORE_NEWS)
  },

  [On.LOGIN]: async function ({ commit, dispatch }, user) {
    var callbackError = (error) => {
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

    var callbackSuccess = (response) => {
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
      dispatch(On.GET_ROLES)
      dispatch(On.LOAD_CONTACTS).then(() => {
        dispatch(On.LOAD_ACCESS_ROLES_AND_PERMISSIONS)
      })
      dispatch(On.LOAD_PREFS)
      dispatch(On.LOAD_NEWS)
      dispatch(On.LOAD_GROUPS)
      dispatch(On.LOAD_DOCS)
      dispatch(On.GET_CONTACT, userId)
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
    dispatch(On.GET_ROLES)
    dispatch(On.LOAD_CONTACTS).then(() => {
      dispatch(On.LOAD_ACCESS_ROLES_AND_PERMISSIONS)
    })
    dispatch(On.LOAD_PREFS)
    dispatch(On.LOAD_NEWS)
    dispatch(On.LOAD_GROUPS)
    dispatch(On.LOAD_DOCS)
    dispatch(On.GET_CONTACT, user._id)
  },
  [On.LOGIN_WAITING]: function ({ commit }) {
    commit(Do.LOGIN_WAITING)
  },
  [On.LOGIN_STOP]: function ({ commit }) {
    commit(Do.LOGIN_STOP)
  },
  [On.LOAD_ACCESS_ROLES_AND_PERMISSIONS]: async function ({ commit, state }) {
    let response
    let response2
    try {
      response = await rest.loadRoles()
      response2 = await rest.loadPermissions()
      let roles = response.data
      let permissions = response2.data
      // console.log(roles)
      // console.log(permissions)

      permissions.forEach((permission) => {
        let newRoles = []
        if (permission.roles && permission.roles.length > 0) {
          permission.roles.forEach((permissionRole) => {
            roles.forEach((role) => {
              if (role._id === permissionRole) {
                newRoles.push(role)
              }
            })
          })
        }
        permission.roles = newRoles
      })

      /* Chargement des informations de contacts  */
      let contacts = state.contacts.fullList
      let dataToSet = []
      roles.forEach((element) => {
        let users = []
        if (element.users && element.users.length > 0) {
          element.users.forEach((userId) => {
            users.push(getContactFromUserId(userId, contacts))
          })
        }
        dataToSet.push({
          _id: element._id,
          color: element.color,
          description: element.description,
          users: users,
          groups: element.groups
        })
      })
      commit(Do.SET_ACCESS_USERS_ROLES, dataToSet)
      commit(Do.SET_ACCESS_PERMISSIONS, permissions)
    } catch (error) {
      let errorMessage = `#ApiAccess001 - Erreur chargement des roles et permissions`
      console.error(errorMessage, error)
      commit(Do.SHOW_GLOBAL_ERROR, errorMessage)
      return
    }
    // commit(Do.SHOW_GLOBAL_SUCCESS, 'Chargement des roles réussi')
    return response
  },
  [On.ADD_ACCESS_ROLE]: async function ({ commit, dispatch }, role) {
    let response
    try {
      response = await rest.addRole(role)
    } catch (error) {
      let errorMessage = `#ApiAccess002 - Erreur lors de l'ajout d'un rôle`
      console.error(errorMessage, error)
      commit(Do.SHOW_GLOBAL_ERROR, errorMessage)
      return
    }
    // console.log(response)
    dispatch(On.LOAD_ACCESS_ROLES_AND_PERMISSIONS)
    commit(Do.SHOW_GLOBAL_SUCCESS, 'Rôle ajouté avec succès')
    commit(Do.HIDE_ROLE_DIALOG)
    return response
  },
  [On.SAVE_ACCESS_USERS_ROLE]: async function ({ state, commit, dispatch }) {
    let response
    let rolesUsers = state.access.rolesUsersList
    try {
      response = await rest.saveUsersRole(rolesUsers)
    } catch (error) {
      let errorMessage = `#ApiAccess005 - Erreur lors de la sauvegarde des rôles`
      console.error(errorMessage, error)
      commit(Do.SHOW_GLOBAL_ERROR, errorMessage)
      return
    }
    // console.log(response)
    dispatch(On.LOAD_ACCESS_ROLES_AND_PERMISSIONS)
    commit(
      Do.SHOW_GLOBAL_SUCCESS,
      'Association des rôles sauvegardée avec succès'
    )
    return response
  },
  [On.SAVE_PERMISSIONS_ROLE]: async function ({ state, commit, dispatch }) {
    let response
    let permissions = state.access.permissionsList
    try {
      response = await rest.savePermissions(permissions)
    } catch (error) {
      let errorMessage = `#ApiAccess006 - Erreur lors de la sauvegarde des permissions`
      console.error(errorMessage, error)
      commit(Do.SHOW_GLOBAL_ERROR, errorMessage)
      return
    }
    // console.log(response)
    dispatch(On.LOAD_ACCESS_ROLES_AND_PERMISSIONS)
    commit(Do.SHOW_GLOBAL_SUCCESS, 'Permissions sauvegardées avec succès')
    return response
  },
  [On.DELETE_ACCESS_ROLE]: async function ({ commit, dispatch }, role) {
    let response
    try {
      response = await rest.deleteRole(role._id)
    } catch (error) {
      let errorMessage = `#ApiAccess003 - Erreur lors de la suppression d'un rôle`
      console.error(errorMessage, error)
      commit(Do.SHOW_GLOBAL_ERROR, errorMessage)
      return
    }
    dispatch(On.LOAD_ACCESS_ROLES_AND_PERMISSIONS)
    commit(Do.SHOW_GLOBAL_SUCCESS, 'Rôle supprimé avec succès')
    return response
  },
  [On.EDIT_ACCESS_ROLE]: async function ({ commit, dispatch }, role) {
    let response
    try {
      response = await rest.editRole(role)
    } catch (error) {
      let errorMessage = `#ApiAccess004 - Erreur lors de la modification d'un rôle`
      console.error(errorMessage, error)
      commit(Do.SHOW_GLOBAL_ERROR, errorMessage)
      return
    }
    dispatch(On.LOAD_ACCESS_ROLES_AND_PERMISSIONS)
    commit(Do.HIDE_ROLE_DIALOG)
    commit(Do.SHOW_GLOBAL_SUCCESS, 'Rôle modifié avec succès')
    return response
  },
  [On.ADD_ACCESS_USERS_ROLE]: async function ({ commit, dispatch }, role) {
    let response
    try {
      response = await rest.addUsersRole(role)
    } catch (error) {
      let errorMessage = `#ApiAccess012 - Erreur lors de l'ajout d'un rôle`
      console.error(errorMessage, error)
      commit(Do.SHOW_GLOBAL_ERROR, errorMessage)
      return
    }
    // console.log(response)
    dispatch(On.LOAD_ACCESS_ROLES_AND_PERMISSIONS)
    commit(Do.SHOW_GLOBAL_SUCCESS, 'Rôle ajouté avec succès')
    commit(Do.HIDE_USERS_ROLE_DIALOG)
    return response
  },
  [On.DELETE_ACCESS_USERS_ROLE]: async function ({ commit, dispatch }, role) {
    let response
    try {
      response = await rest.deleteUsersRole(role._id)
    } catch (error) {
      let errorMessage = `#ApiAccess013 - Erreur lors de la suppression d'un rôle`
      console.error(errorMessage, error)
      commit(Do.SHOW_GLOBAL_ERROR, errorMessage)
      return
    }
    dispatch(On.LOAD_ACCESS_ROLES_AND_PERMISSIONS)
    commit(Do.SHOW_GLOBAL_SUCCESS, 'Rôle supprimé avec succès')
    return response
  },
  [On.EDIT_ACCESS_USERS_ROLE]: async function ({ commit, dispatch }, role) {
    let response
    try {
      response = await rest.editUsersRole(role)
    } catch (error) {
      let errorMessage = `#ApiAccess014 - Erreur lors de la modification d'un rôle`
      console.error(errorMessage, error)
      commit(Do.SHOW_GLOBAL_ERROR, errorMessage)
      return
    }
    dispatch(On.LOAD_ACCESS_ROLES_AND_PERMISSIONS)
    commit(Do.HIDE_USERS_ROLE_DIALOG)
    commit(Do.SHOW_GLOBAL_SUCCESS, 'Rôle modifié avec succès')
    return response
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
    // console.log('element.type', element.type)
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

const getAvatar = (contact) => {
  if (!contact) return '/static/img/default.jpg'
  return (
    '/static/img/' +
    (contact.thumbnailPhoto
      ? 'ad-photos/' + contact.sAMAccountName
      : 'default') +
    '.jpg'
  )
}

/**
 * Retourne des informations de contact à partir d'un userId
 * @param {*} userId
 * @param {*} contacts
 */
const getContactFromUserId = (userId, contacts) => {
  let returnContact
  for (let index = 0; index < contacts.length; index++) {
    const contact = contacts[index]
    if (contact.sAMAccountName === userId) {
      returnContact = {
        _id: userId,
        prenom: contact.givenName,
        nom: contact.sn
      }
      break
    }
  }
  if (!returnContact) {
    returnContact = {
      _id: userId,
      prenom: 'John',
      nom: 'DOE'
    }
  }
  return returnContact
}
