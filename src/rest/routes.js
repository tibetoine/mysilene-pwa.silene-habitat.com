import api from './api'

export default {
  getContacts: () => api.get(`api/contacts`),
  getNewsOld: () => api.get(`api/news`),
  getNews: () => api.get(`api/newsSilene`),
  getLastWeather: () => api.get(`api-weather/weather`),
  login: (user, callbackSuccess, callbackError) => {
    api.post(`api-auth/auth`, { id: user.userId, password: user.password }, callbackSuccess, callbackError)
  }
}
