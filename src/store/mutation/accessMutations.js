import Do from '../../const/do'

export default {
  [Do.SET_ACCESS_PERMISSIONS]: (state, permissions) => {
    state.access.permissionsList = JSON.parse(JSON.stringify(permissions))
    state.access.permissionsListInBase = JSON.parse(JSON.stringify(permissions))
  },
  [Do.SET_ACCESS_USERS_ROLES]: (state, roles) => {
    state.access.rolesUsersList = JSON.parse(JSON.stringify(roles))
    state.access.rolesUsersListInBase = JSON.parse(JSON.stringify(roles))
  },
  [Do.RESET_ACCESS_PERMISSIONS]: (state) => {
    state.access.permissionsList = JSON.parse(
      JSON.stringify(state.access.permissionsListInBase)
    )
  },
  [Do.RESET_ACCESS_USERS_ROLES]: (state) => {
    state.access.rolesUsersList = JSON.parse(
      JSON.stringify(state.access.rolesUsersListInBase)
    )
  }
}
