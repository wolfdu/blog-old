import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from 'components/Login/Login.vue'
import PostsView from 'components/Posts/Posts.vue'

// import store from '../vuex/store'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {path: '/login', component: LoginView},
    {path: '/posts', component: PostsView},
    {path: '*', redirect: '/posts'}
  ]
})

export {
  router
}
