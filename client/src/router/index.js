'use strict'

import PostsView from 'components/PostList.vue'
import PostView from 'components/Post.vue'
import TagView from 'components/Tag.vue'

const routes = [
  {path: '/posts', component: PostsView},
  {path: '/post/:postId', component: PostView, name: 'post'},
  {path: '/tag/:tagId', component: TagView, name: 'tag'},
  {path: '*', redirect: '/posts'}
]

export default {
  routes
}
