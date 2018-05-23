import Vue from 'vue'

const url = path => window.location.origin + '/' + path
const options = () => ({emulateJSON: true})

export default {

  setDefaultAuthorization: token => {
    Vue.http.headers.common['Authorization'] = token
  },
  deleteDefaultAuthorization: token => {
    Vue.http.headers.common['Authorization'] = null
  },
  get: path => {
    var obj = Vue.http.get(url(path), options())
    return obj
  },

  post: (path, body, callbackSuccess, callbackError) => Vue.http.post(url(path), body, options()).then((response) => {
    if (callbackSuccess) {
      callbackSuccess(response)
    }
  }).catch(error => {
    if (callbackError) {
      callbackError(error)
    }
  }),

  del: path => Vue.http.del(url(path)),

  put: (path, body) => Vue.http.put(url(path), body, options())
}
