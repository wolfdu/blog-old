// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './stylus/index.styl'
import Vue from 'vue'
import router from './router'
import App from './App.vue'
import Icon from 'vue-svg-icon/Icon.vue'
import {markdown} from './filters/markdown'
import 'font-awesome/css/font-awesome.min.css'
import 'highlight.js/styles/darcula.css'

Vue.filter('markdown', markdown)

Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
