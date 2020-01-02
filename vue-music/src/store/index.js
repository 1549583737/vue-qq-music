import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // 每次通过mutation去修改state的时候都会看到prestate nextstate这样的日志

Vue.use(Vuex)

// 调试工具  直接修改state会报错 npm run dev NODE_EV dev环境     npm run build NODE_EV production环境
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug, // 线下调试时 dev  debug= true 开发模式  debug= false 线上模式
  plugins: debug ? [createLogger()] : []
})