// import 'babel-polyfill';
import Vue from 'vue'
import App from './App'

import fastclick from 'fastclick' //处理移动端click事件300毫秒延迟
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import 'common/stylus/index.styl'

// 解决移动端点击延迟300ms
// fastclick.attach(document.body)
Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: require('base/loading/loading.gif')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
