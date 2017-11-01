'use strict'

import Vue from 'vue'
import Router from 'vue-router'
import PostsView from 'components/PostList.vue'
import PostView from 'components/Post.vue'
import TagView from 'components/Tag.vue'
import AboutView from 'components/About.vue'

Vue.use(Router)

const routes = [
  {path: '/posts', component: PostsView},
  {path: '/post/:postId', component: PostView, name: 'post'},
  {path: '/tag/:tagId', component: TagView, name: 'tag'},
  {path: '/about', component: AboutView, name: 'about'},
  {path: '*', redirect: '/posts'}
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
