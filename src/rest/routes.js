import api from './api'

export default {
  getContacts: () => api.get(`api/contacts`),
  healthcheck: () => api.get(`healthcheck`),
  getDocs: () => api.get(`api-docs/docs`),
  getNews: () => api.get(`api/news`),
  isAdmin: userId => api.get(`api/users/admin/${userId}`),
  getUsers: () => api.get(`api/users`),
  getUser: userId => api.get(`api/users/${userId}`),
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
  deleteUser: username => api.del(`api-admin/users/${username}`)
}
