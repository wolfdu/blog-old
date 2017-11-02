'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import PostsList from 'components/PostList.vue'
import Post from 'components/Post.vue'
import Tag from 'components/Tag.vue'
import About from 'components/About.vue'

Vue.use(Router)

const routes = [
  {path: '/posts', component: PostsList},
  {path: '/post', component: Post, name: 'post'},
  {path: '/tag', component: Tag, name: 'tag'},
  {path: '/about', component: About, name: 'about'},
  {path: '*', redirect: '/posts'}
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
