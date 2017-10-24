'use strict'

import PostsView from 'components/PostList.vue'
import PostView from 'components/Post.vue'

const routes = [
  {path: '/posts', component: PostsView},
  {path: '/post/:postId', component: PostView, name: 'post'},
  {path: '*', redirect: '/posts'}
]

export default {
  routes
}
