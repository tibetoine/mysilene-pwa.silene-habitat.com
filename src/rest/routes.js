import api from './api'

export default {
  getContacts: () => api.get(`api/contacts`),
  healthcheck: () => api.get(`healthcheck`),
  getDocs: () => api.get(`api-docs/docs`),
  getNews: () => api.get(`api/news`),
  getLastWeather: () => api.get(`api-weather/weather`),
  login: (user, callbackSuccess, callbackError) => {
    api.post(`api-auth/auth`, { id: user.userId, password: user.password }, callbackSuccess, callbackError)
  }
}
