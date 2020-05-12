import Do from '../../const/do'

export default {
  [Do.SET_ACCESS_ROLES]: (state, roles) => {
    state.access.rolesList = roles
  },
  [Do.SET_ACCESS_PERMISSIONS]: (state, permissions) => {
    console.log('MOUAI')
    state.access.permissionsList = JSON.parse(JSON.stringify(permissions))
    state.access.permissionsListInBase = JSON.parse(JSON.stringify(permissions))
  },
  [Do.SET_ACCESS_USERS_ROLES]: (state, roles) => {
    console.log('MOUAI2')
    state.access.rolesUsersList = JSON.parse(JSON.stringify(roles))
    state.access.rolesUsersListInBase = JSON.parse(JSON.stringify(roles))
  },
  [Do.RESET_ACCESS_PERMISSIONS]: (state) => {
    console.log('MOUAI3')
    state.access.permissionsList = JSON.parse(
      JSON.stringify(state.access.permissionsListInBase)
    )
  },
  [Do.RESET_ACCESS_USERS_ROLES]: (state) => {
    console.log('MOUAI4')
    state.access.rolesUsersList = JSON.parse(
      JSON.stringify(state.access.rolesUsersListInBase)
    )
  }
}
