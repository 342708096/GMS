import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const state = {
  user: {
    nickname: 'Admin'
  }
}

class VuexTool {
  constructor (state) {
    this.state = state
  }
  get getters () {
    let ret = {}
    Object.keys(this.state).forEach((key) => { ret[key] = (state) => state[key] })
    return ret
  }
  static toSetStyle (str, token = '_') {
    return 'SET_' + str.replace(/([a-z\d])([A-Z])/g, `$1${token}$2`).toUpperCase()
  }
  get mutations () {
    let ret = {}
    Object.keys(this.state).forEach((key) => { ret[VuexTool.toSetStyle(key)] = (state, o) => { state[key] = o } })
    return ret
  }
}

const debug = process.env.NODE_ENV !== 'production'
const vuexTool = new VuexTool(state)
export default new Vuex.Store({
  actions: {},
  getters: vuexTool.getters,
  state,
  mutations: vuexTool.mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
