import Vue from 'vue'
import Router from 'vue-router'
import LoginView from 'components/Login.vue'
import PostsView from 'components/Posts.vue'
import TagsView from 'components/Tags.vue'
import AboutView from 'components/About.vue'

Vue.use(Router)

const routes = [
  {path: '/login', component: LoginView, name: 'login'},
  {path: '/posts', component: PostsView},
  {path: '/tags', component: TagsView},
  {path: '/about', component: AboutView},
  {path: '*', redirect: '/posts'}
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // login页
  /* if (to.name === 'login') {
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
  } */
})

export default router
