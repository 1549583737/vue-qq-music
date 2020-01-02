// import 'babel-polyfill';
import Vue from 'vue'
import App from './App'

// import fastclick from 'fastclick'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import 'common/stylus/index.styl'

// 解决移动端点击延迟300ms
fastclick.attach(document.body)
Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
