// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './stylus/index.styl'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import MessageBox from 'vue-msgbox'
import App from './App.vue'
import store from './vuex/store'

Vue.config.productionTip = false

Vue.use(VueRouter)
const router = new VueRouter(routes)

router.beforeEach((to, from, next) => {
  // login页
  if (to.name === 'login') {
    next()
  } else {
    if (store) {
      if (store.state.token.token !== null) {
        next()
      } else {
        next({path: '/login'})
      }
    } else {
      next({path: '/login'})
    }
  }
})

window.alert = MessageBox

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
