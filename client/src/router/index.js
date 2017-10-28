'use strict'

import PostsView from 'components/PostList.vue'
import PostView from 'components/Post.vue'
import TagView from 'components/Tag.vue'
import AboutView from 'components/About.vue'

const routes = [
  {path: '/posts', component: PostsView},
  {path: '/post/:postId', component: PostView, name: 'post'},
  {path: '/tag/:tagId', component: TagView, name: 'tag'},
  {path: '/about', component: AboutView, name: 'about'},
  {path: '*', redirect: '/posts'}
]

export default {
  routes
}
