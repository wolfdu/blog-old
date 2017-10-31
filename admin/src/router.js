import Vue from 'vue'
import Router from 'vue-router'
import LoginView from 'components/Login.vue'
import PostsView from 'components/Posts.vue'
import TagsView from 'components/Tags.vue'
import AboutView from 'components/About.vue'
import {isLogin} from './utils/authUtil'

Vue.use(Router)

const routes = [
  {path: '/login', component: LoginView, name: 'login'},
  {path: '/posts', component: PostsView, meta: {requireAuth: true}},
  {path: '/tags', component: TagsView, meta: {requireAuth: true}},
  {path: '/about', component: AboutView, meta: {requireAuth: true}},
  {path: '*', redirect: '/posts', meta: {requireAuth: true}}
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!isLogin()) {
      next({path: '/login'})
    }
  }
  next()
})

export default router
