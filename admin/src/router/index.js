import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from 'components/Login/Login.vue'
import PostsView from 'components/Posts/Posts.vue'

import store from '../vuex/store'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {path: '/login', component: LoginView},
    {path: '/posts', component: PostsView},
    {path: '*', redirect: '/posts'}
  ]
})

router.beforeEach(function ({from, to, next, redirect}) {
  console.log(store.state.token.token)
  if (to.authPage !== true) {
    if (store.state.token.token === null) {
      redirect('login')
    } else {
      next()
    }
  } else {
    // login页
    if (store.state.token.token === null) {
      next()
    } else {
      if (undefined !== from.path) {
        redirect(from.path)
      } else {
        redirect('posts')
      }
    }
  }
})

export {
  router
}
