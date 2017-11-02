'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import PostsList from 'components/PostList.vue'
import Post from 'components/Post.vue'
import Tag from 'components/Tag.vue'
import About from 'components/About.vue'

Vue.use(Router)

const routes = [
  {path: '/posts', component: PostsList, meta: {goTop: true}},
  {path: '/post', component: Post, name: 'post', meta: {goTop: true}},
  {path: '/tag', component: Tag, name: 'tag', meta: {goTop: true}},
  {path: '/about', component: About, name: 'about', meta: {goTop: true}},
  {path: '*', redirect: '/posts'}
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.goTop)) {
    window.scroll(0, 0)
  }
  next()
})
export default router
