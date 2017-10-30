// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './vuex/store'
import Icon from 'vue-svg-icon/Icon.vue'
import {md2Text} from './filters/md2Text'
import './stylus/index.styl'
import 'font-awesome/css/font-awesome.min.css'
import 'vue-msgbox/lib/vue-msgbox.css'

Vue.config.productionTip = false

Vue.filter('md2Text', md2Text)

Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
