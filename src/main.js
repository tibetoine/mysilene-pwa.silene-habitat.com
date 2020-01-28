// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import router from './router'
import store from './store/store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import rest from './rest/routes'
import VueClazyLoad from 'vue-clazy-load'
import infiniteScroll from 'vue-infinite-scroll'
import VueGtag from 'vue-gtag'

Vue.use(VueResource)

/* Couleurs Silène (A partir du logo) */
// Jaune : #fabd00
// Oeil Jaune foncé : #ef7b00
// Bleu gauche : #006eb5
// Oeil Bleu foncé : #004c95
// Chapeau bleu droit : #2a91cd
// Chapeau vert gauche : #83ba00
Vue.use(Vuetify, { theme: {
  primary: '#83ba00',
  secondary: '#006eb5',
  accent: '#fabd00',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.use(VueClazyLoad)
Vue.use(infiniteScroll)

Vue.use(VueGtag, {
  config: { id: process.env.GTAG_ANALYTICS }
}, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  rest,
  components: { App },
  template: '<App/>'
})
