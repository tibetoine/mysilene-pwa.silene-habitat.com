import Do from '../../const/do'
/* eslint-disable */
export default {

  [Do.LOGIN]: (state, user) => {
    state.contacts.login.userId = user._id
    state.contacts.login.token = user.token
  },
  [Do.LOGIN_FAIL]: (state, errorMessage) => {    
    state.login.Authenticate = false
    state.login.AuthFailure = true
    state.login.AuthFailMsg = errorMessage
  },
  [Do.LOGIN_SUCCESS]: (state) => {    
    state.login.AuthFailure = false
    state.login.Authenticate = true
    state.login.AuthFailMsg = null
  }
}
