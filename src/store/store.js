import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import appActions from './actions/appActions'
import contactsMutations from './mutation/contactsMutations'
import newsMutations from './mutation/newsMutations'
import weatherMutations from './mutation/weatherMutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations: {
    ...contactsMutations,
    ...newsMutations,
    ...weatherMutations
  },
  actions: {
    ...appActions
  }
})

export default store
