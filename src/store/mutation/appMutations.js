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
  }
}
