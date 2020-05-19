import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import appActions from './actions/appActions'
import healthcheckMutations from './mutation/healthcheckMutations'
import contactsMutations from './mutation/contactsMutations'
import usersMutations from './mutation/usersMutations'
import newsMutations from './mutation/newsMutations'
import weatherMutations from './mutation/weatherMutations'
import loginMutations from './mutation/loginMutations'
import docsMutations from './mutation/docsMutations'
import appMutations from './mutation/appMutations'
import shiftMutations from './mutation/shiftMutations'
import accessMutations from './mutation/accessMutations'
import interessementMutations from './mutation/interessementMutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations: {
    ...healthcheckMutations,
    ...contactsMutations,
    ...newsMutations,
    ...weatherMutations,
    ...loginMutations,
    ...docsMutations,
    ...usersMutations,
    ...appMutations,
    ...shiftMutations,
    ...accessMutations,
    ...interessementMutations
  },
  actions: {
    ...appActions
  }
})

export default store
