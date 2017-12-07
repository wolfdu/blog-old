import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import('components/Login.vue')
const Home = () => import('components/home/Home.vue')
const Posts = () => import('components/home/components/Posts.vue')
const Tags = () => import('components/home/components/Tags.vue')
const About = () => import('components/home/components/About.vue')
import {isLogin} from './utils/authUtil'

Vue.use(Router)

const routes = [
  {path: '/login', component: Login, name: 'login'},
  {path: '/',
    component: Home,
    children: [
    {path: 'posts', component: Posts},
    {path: 'tags', component: Tags},
    {path: 'about', component: About}
    ],
    meta: {requireAuth: true}},
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
