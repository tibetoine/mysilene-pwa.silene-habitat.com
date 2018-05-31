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

window.mysilene = {}
window.mysilene.pwa = {
  // public key of the push notification server.
  // if you are using the Test Push Notification Server,
  // get public key from https://web-push-codelab.glitch.me/
  applicationServerPublicKey: 'BOtedYcp8hp_q1gUxwcCmeJTZuSA86dGfwMsNvuQgnYksn89pneGkZehI_W4HS7ZWpmJiwggxCi2LXyey49gkxs',
  registration: null,
  isSubscribed: false,
  // call when service worker is registered
  checkSubscription (registration) {
    registration.pushManager.getSubscription()
      .then((subscription) => {
        this.isSubscribed = !(subscription === null)

        // send subscription info to server (the server will send push notification to this subscription)
        this.updateSubscriptionOnServer({ subscription: subscription, isActive: this.isSubscribed })

        this.registration = registration

        // update UI to indicate Push Notification is subscribed or not
        // this.initUi({ isSubscribed: this.isSubscribed })
      })
  },
  // subscribe push notification
  subscribe () {
    const applicationServerKey = this.urlB64ToUint8Array(this.applicationServerPublicKey)

    return this.registration.pushManager.subscribe({
      // https://developers.google.com/web/fundamentals/push-notifications/subscribing-a-user#uservisibleonly_options
      // symbolic agreement with the browser that the web app will show
      // a notification every time a push is received (i.e. no silent push).
      userVisibleOnly: true,
      applicationServerKey
    })
      .then((subscription) => {
        // subscription successful, send subscription info to server
        this.updateSubscriptionOnServer({ subscription, isActive: true })
        this.isSubscribed = true
        return true
      })
  },
  // unsubscribe push notification
  unsubscribe () {
    return this.registration.pushManager.getSubscription()
      .then((subscription) => {
        if (subscription) {
          // unsubscribe successful, update server
          this.updateSubscriptionOnServer({ subscription, isActive: false })
          this.isSubscribed = false
          return subscription.unsubscribe()
        }
        return false
      })
  },
  // send subscription info to server
  updateSubscriptionOnServer ({ subscription, isActive }) {
    // if you are using https://web-push-codelab.glitch.me/ as a Test Push Notification Server
    // you need to copy and paste this string
    console.log(JSON.stringify(subscription))

    // if you implemented your own Push Notification Server
    /*
    axios({
      method: 'post',
      url: '/_intents/subscribe',
      data: {
        subscription_info: JSON.stringify(subscription),
        isActive: isActive
      }
    })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
      */
  },
  // convert applicationServerPublicKey
  urlB64ToUint8Array (base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
}
