import Do from '../../const/do'

export default {
  [Do.SET_ACCESS_ROLES]: (state, roles) => {
    state.access.rolesList = roles
  },
  [Do.SET_ACCESS_USERS_ROLES]: (state, roles) => {
    state.access.rolesUsersList = roles
  }
}
