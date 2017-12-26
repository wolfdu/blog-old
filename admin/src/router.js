import Vue from 'vue'
import Router from 'vue-router'
import { isLogin } from './utils/authUtil'
const Login = () => import('components/Login.vue')
const Home = () => import('components/home/Home.vue')
const Posts = () => import('components/home/components/Posts.vue')
const Tags = () => import('components/home/components/Tags.vue')
const About = () => import('components/home/components/About.vue')
const Dashboard = () => import('components/home/components/Dashboard.vue')

Vue.use(Router)

const routes = [
  {path: '/login', component: Login, name: 'login'},
  {path: '/',
    component: Home,
    children: [
    {path: 'posts', name: 'posts', component: Posts},
    {path: 'tags', component: Tags},
    {path: 'about', component: About},
    {path: 'dashboard', component: Dashboard}
    ],
    meta: {requireAuth: true}},
  {path: '*', redirect: '/dashboard', meta: {requireAuth: true}}
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
