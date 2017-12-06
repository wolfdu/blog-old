'use strict'

import Vue from 'vue'
import Router from 'vue-router'
const PostsList = () => import('components/PostList.vue')
const Post = () => import('components/Post.vue')
const Tag = () => import('components/Tag.vue')
const About = () => import('components/About.vue')
const Archive = () => import('components/Archive.vue')

Vue.use(Router)

const routes = [
  {path: '/posts', component: PostsList},
  {path: '/archive', component: Archive, meta: {goTop: true}},
  {path: '/post', component: Post, name: 'post', meta: {goTop: true}},
  {path: '/tag', component: Tag, name: 'tag', meta: {goTop: true}},
  {path: '/about', component: About, name: 'about', meta: {goTop: true}},
  {path: '*', redirect: '/posts'}
]

const router = new Router({
  mode: 'history',
  routes
})

router.afterEach((to, from, next) => {
  if (to.matched.some(record => record.meta.goTop)) {
    window.scroll(0, 0)
  }
})
export default router
