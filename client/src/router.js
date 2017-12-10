'use strict'

import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('views/index.vue')
const PostsList = () => import('components/posts/List.vue')
const Post = () => import('components/posts/Post.vue')
const Tag = () => import('views/Tag.vue')
const About = () => import('views/About.vue')
const Archive = () => import('views/Archive.vue')

Vue.use(Router)

const routes = [
  {path: '/',
    component: Index,
    children: [
    {path: '/', component: PostsList},
    {path: '/post', component: Post, name: 'post', meta: {goTop: true}},
    {path: '/tag', component: Tag, name: 'tag', meta: {goTop: true}},
    {path: '/archive', component: Archive, meta: {goTop: true}}
    ]},
  {path: '/about', component: About, name: 'about', meta: {goTop: true}},
  {path: '*', redirect: '/'}
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
