import Vue from 'vue'

const url = (path) => window.location.origin + '/' + path
const options = () => ({ emulateJSON: true })

export default {
  setDefaultAuthorization: (token, userId) => {
    Vue.http.headers.common['authorization'] = token
    Vue.http.headers.common['userid'] = userId
  },
  deleteDefaultAuthorization: (token) => {
    Vue.http.headers.common['authorization'] = null
    Vue.http.headers.common['userid'] = null
  },
  get: (path, body) => {
    var obj = Vue.http.get(url(path), body, options())
    return obj
  },
  getXlsx: (path) => {
    var obj = Vue.http.get(url(path), { responseType: 'arraybuffer' })
    return obj
  },
  post: (path, body, callbackSuccess, callbackError) =>
    Vue.http
      .post(url(path), body, options())
      .then((response) => {
        if (callbackSuccess) {
          callbackSuccess(response)
        } else {
          return response
        }
      })
      .catch((error) => {
        if (callbackError) {
          callbackError(error)
        } else {
          throw error
        }
      }),

  del: (path) => Vue.http.delete(url(path)),

  put: (path, body) => Vue.http.put(url(path), body, options())
}
