import 'babel-polyfill';
import Vue from 'vue'
import App from './App'

import fast
import router from './router'
import 'common/stylus/index.styl'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
