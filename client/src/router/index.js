import PostsView from 'components/PostList.vue'

const routes = [
  {path: '/posts', component: PostsView},
  {path: '*', redirect: '/posts'}
]

export default {
  routes
}
