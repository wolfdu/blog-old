import PostsView from 'components/Posts.vue'

const routes = [
  {path: '/posts', component: PostsView},
  {path: '*', redirect: '/posts'}
]

export default {
  routes
}
