import api from './api'

export default {
  getContacts: () => api.get(`api/contacts`),
  getNewsOld: () => api.get(`api/news`),
  getNews: () => api.get(`api/newsSilene`)
}
