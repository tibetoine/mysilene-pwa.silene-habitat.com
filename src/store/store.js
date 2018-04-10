import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import appActions from './actions/appActions'
import contactsMutations from './mutation/contactsMutations'
import newsMutations from './mutation/newsMutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations: {
    ...contactsMutations,
    ...newsMutations
  },
  actions: {
    ...appActions
  }
})

export default store
