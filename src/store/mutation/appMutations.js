/**
 * Author : Arobert
 * Permet de définir les mutations globales à l'application. (Framework buisness)
 */
import Do from '../../const/do'
/* eslint-disable */
export default {
  /* Permet d'enregistrer une erreur dans une partie cachée de l'app */
  [Do.LOG_ERROR_ON_CLIENT]: (state, error) => {
    state.error.data = error
  },
  [Do.SHOW_ERROR_DIALOG]: (state) => {
    state.error.showDialog = true
  },
  [Do.SHOW_SHIFT_DIALOG]: (state) => {
    state.shift.showDialog = true
  },
  [Do.HIDE_SHIFT_DIALOG]: (state) => {
    state.shift.showDialog = false
  },
  [Do.SHOW_SHIFT_SUCCESS]: (state, msg) => {
    state.shift.showSnackbar = true
    state.shift.snackbarColor = 'success'
    state.shift.snackbarMessage = msg
  },
  [Do.SHOW_SHIFT_ERROR]: (state, msg) => {
    state.shift.showSnackbar = true
    state.shift.snackbarColor = 'error'
    state.shift.snackbarMessage = msg
  },
  [Do.SHOW_DOWN_DIALOG]: (state) => {
    state.downState.showDialog = true
  },
  [Do.HIDE_SEARCH]: (state) => {
    state.search.visible = false
  },
  [Do.SHOW_OFFLINE_DIALOG]: (state) => {
    state.offline.showDialog = true
    state.offline.read = true
  },
  [Do.HIDE_OFFLINE_DIALOG]: (state) => {
    state.offline.showDialog = false
    state.offline.read = true
  },
  [Do.SET_USERS]: (state, users) => {
    state.users.usersList = users
  },
  [Do.DELETE_USER_ERROR]: (state) => {
    state.users.deletedUserError = true
  },
  [Do.DELETE_USER_SUCCESS]: (state) => {
    state.users.deletedUserSuccess = true
  },
  [Do.SHOW_GLOBAL_SUCCESS]: (state, msg) => {
    state.snackbar.visible = true
    state.snackbar.color = 'success'
    state.snackbar.message = msg
  },
  [Do.SHOW_GLOBAL_ERROR]: (state, msg) => {
    state.snackbar.visible = true
    state.snackbar.color = 'error'
    state.snackbar.message = msg
  },
  [Do.SHOW_ROLE_DIALOG]: (state) => {
    state.access.showDialog = true
  },
  [Do.HIDE_ROLE_DIALOG]: (state) => {
    state.access.showDialog = false
  },
  [Do.SHOW_USERS_ROLE_DIALOG]: (state) => {
    state.access.rolesUsersShowDialog = true
  },
  [Do.HIDE_USERS_ROLE_DIALOG]: (state) => {
    state.access.rolesUsersShowDialog = false
  },
  [Do.SHOW_USERS_ROLE_ADD_DIALOG]: (state) => {
    state.access.rolesUsersShowDialogAdd = true
  },
  [Do.HIDE_USERS_ROLE_ADD_DIALOG]: (state) => {
    state.access.rolesUsersShowDialogAdd = false
  },
  [Do.SHOW_GROUPS_ROLE_ADD_DIALOG]: (state) => {
    state.access.rolesGroupsShowDialogAdd = true
  },
  [Do.HIDE_GROUPS_ROLE_ADD_DIALOG]: (state) => {
    state.access.rolesGroupsShowDialogAdd = false
  },
  [Do.SHOW_PERMISSIONS_ROLE_DIALOG]: (state) => {
    state.access.rolesPermissionsShowDialog = true
  },
  [Do.HIDE_PERMISSIONS_ROLE_DIALOG]: (state) => {
    state.access.rolesPermissionsShowDialog = false
  }
}
