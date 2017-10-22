// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './stylus/index.styl'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import App from './App.vue'
import Icon from 'vue-svg-icon/Icon.vue'

Vue.use(VueRouter)
const router = new VueRouter(routes)

Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
