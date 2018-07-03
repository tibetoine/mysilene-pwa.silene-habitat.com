import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import appActions from './actions/appActions'
import contactsMutations from './mutation/contactsMutations'
import newsMutations from './mutation/newsMutations'
import weatherMutations from './mutation/weatherMutations'
import loginMutations from './mutation/loginMutations'
import docsMutations from './mutation/docsMutations'
import appMutations from './mutation/appMutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations: {
    ...contactsMutations,
    ...newsMutations,
    ...weatherMutations,
    ...loginMutations,
    ...docsMutations,
    ...appMutations
  },
  actions: {
    ...appActions
  }
})

export default store
