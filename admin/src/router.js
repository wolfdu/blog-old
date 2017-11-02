import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/Login.vue'
import Posts from 'components/Posts.vue'
import Tags from 'components/Tags.vue'
import About from 'components/About.vue'
import {isLogin} from './utils/authUtil'

Vue.use(Router)

const routes = [
  {path: '/login', component: Login, name: 'login'},
  {path: '/posts', component: Posts, meta: {requireAuth: true}},
  {path: '/tags', component: Tags, meta: {requireAuth: true}},
  {path: '/about', component: About, meta: {requireAuth: true}},
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
