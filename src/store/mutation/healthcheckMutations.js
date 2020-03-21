import Do from '../../const/do'
/* eslint-disable */
export default {
  /**
   * Enregistre en state que le serveur est down.
   */
  [Do.SET_DOWN]: (state, message) => {
    state.downState.status = true
    state.downState.downMessage = message
  },
  [Do.SET_UP]: (state, message) => {
    state.downState.status = false
    state.downState.downMessage = null
  }
}
