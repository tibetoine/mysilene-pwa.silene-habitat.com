import Do from '../../const/do'
/* eslint-disable */
export default {
  [Do.LOGIN_FAIL]: (state, errorMessage) => {
    state.login.loading = false
    state.login.Authenticate = false
    state.login.AuthFailure = true
    state.login.AuthFailMsg = errorMessage
  },
  [Do.LOGIN_SUCCESS]: (state, response) => {
    state.login.loading = false
    state.login.AuthFailure = false
    state.login.AuthFailMsg = null
    state.login.Authenticate = true
    state.login.AuthFailMsg = null
    state.login.loginDialogVisible = false
    state.error.data = null
    //TODO : à vérifier en cas réel
    state.login.userId = response._id
    state.login.token = response.token
  },
  [Do.LOGOUT]: state => {
    state.login.AuthFailure = false
    state.login.AuthFailMsg = null
    state.login.Authenticate = false
    state.login.AuthFailMsg = null
    state.login.loginDialogVisible = false
    //TODO : à vérifier en cas réel
    state.login.userId = null
    state.login.token = null
  },
  [Do.LOGIN_WAITING]: state => {
    state.login.loading = true
  },
  [Do.LOGIN_STOP]: state => {
    state.login.loading = false
  }
}
