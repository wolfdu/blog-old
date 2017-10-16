// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './stylus/index.styl'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import MessageBox from 'vue-msgbox'
import App from './App.vue'
import store from './vuex/store'
import Icon from 'vue-svg-icon/Icon.vue'
import {md2Text} from './filters/md2Text'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false

Vue.filter('md2Text', md2Text)

Vue.use(VueRouter)
const router = new VueRouter(routes)

router.beforeEach((to, from, next) => {
  // login页
  if (to.name === 'login') {
    if ((!store || store.state.token.token === null)) {
      next()
    } else {
      next({path: '/posts'})
    }
  } else {
    if ((!store || store.state.token.token === null)) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

window.alert = MessageBox
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
