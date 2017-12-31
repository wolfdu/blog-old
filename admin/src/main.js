// The Vue build version to load with the `import` command
import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './vuex/store'
import Icon from 'vue-svg-icon/Icon.vue'
import './stylus/index.styl'
import 'font-awesome/css/font-awesome.min.css'
import 'vue-toast/dist/vue-toast.min.css'
import 'highlight.js/styles/darcula.css'

Vue.config.productionTip = false

Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
