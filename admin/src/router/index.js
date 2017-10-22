import LoginView from 'components/Login/Login.vue'
import PostsView from 'components/Posts/Posts.vue'
import TagsView from 'components/Tags/Tags.vue'

const routes = [
  {path: '/login', component: LoginView, name: 'login'},
  {path: '/posts', component: PostsView},
  {path: '/tags', component: TagsView},
  {path: '*', redirect: '/posts'}
]

export default {
  routes
}
