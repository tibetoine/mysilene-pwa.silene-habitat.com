import api from './api'

export default {
  getContacts: () => api.get(`api/contacts`),
  getGroups: () => api.get(`api/groups`),
  healthcheck: () => api.get(`healthcheck`),
  getDocs: () => api.get(`api-docs/docs`),
  getNews: () => api.get(`api/news`),
  isAdmin: (userId) => api.get(`api/users/admin/${userId}`),
  getUsers: () => api.get(`api/users`),
  getUser: (userId) => api.get(`api/users/${userId}`),
  putUsers: (userId, prefs) => api.put(`api/users/${userId}`, { prefs: prefs }),
  getLastWeather: () => api.get(`api-weather/weather`),
  login: (user, callbackSuccess, callbackError) => {
    api.post(
      `api-auth/auth`,
      { id: user.userId, password: user.password },
      callbackSuccess,
      callbackError
    )
  },
  deleteUser: (username) => api.del(`api-admin/users/${username}`),
  deleteShift: (shiftId) => api.del(`api-shift/shifts/${shiftId}`),
  deleteDetail: (detailId) => {
    // console.log(`api-shift/shifts/details/${detailId}`)
    return api.del(`api-shift/shifts/details/${detailId}`)
  },
  putShift: (username, shift) =>
    api.put(`api-shift/shifts/users/${username}`, shift),
  getShifts: (username) => api.get(`api-shift/shifts/users/${username}`),
  getRoles: (username) => api.get(`api/users/${username}/roles`),
  extractAll: () => api.getXlsx(`api-shift/shifts/extract`),
  extractForUser: (username) =>
    api.get(`api-shift/shifts/users/${username}/extract`),
  getChildren: (username) => api.get(`api/users/manager/${username}/children`),
  getAllChildren: (username) => api.get(`api/users/rh/${username}/all`),
  getContact: (username) => api.get(`api/contacts/${username}`),
  editRole: (role) => api.put(`api-access/roles/${role._id}`, role),
  deleteRole: (roleId) => api.del(`api-access/roles/${roleId}`),
  addRole: (role) => api.post(`api-access/roles`, role),
  loadRoles: () => api.get(`api-access/roles`),
  loadPermissions: () => api.get(`api-access/permissions`),
  loadUsersRoles: () => api.get(`api-access/roles`),
  saveUsersRole: (usersRole) =>
    api.put(`api-access/roles/usersAndGroups`, JSON.stringify(usersRole)),
  savePermissions: (permissions) =>
    api.put(`api-access/permissions`, JSON.stringify(permissions)),
  upload: (file) => api.upload(`api-itt/upload`, file),
  addContactSaturday: (username) =>
    api.post(`api/contacts/${username}/saturday`),
  deleteContactSaturday: (username) =>
    api.del(`api/contacts/${username}/saturday`),
  loadInteressementConfig: (year) =>
    api.get(`api-itt/interessement/config/${year}`),
  loadInteressementUser: (username, year) =>
    api.get(`api-itt/interessement/${username}/${year}`),
  loadInteressementsEtContacts: (year) =>
    api.get(`api-itt/interessements/${year}`),
  saveInteressementUser: (username, year, interessementUser) =>
    api.put(
      `api-itt/interessement/${username}/${year}`,
      JSON.stringify(interessementUser)
    ),
  closeInteressement: (closed, year) =>
    api.put(`api-itt/interessement/closed/${year}`, { closed: closed }),
  exportInteressements: (year) =>
    api.getXlsx(`api-itt/interessement/export/${year}`)
}
