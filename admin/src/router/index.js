import LoginView from 'components/Login.vue'
import PostsView from 'components/Posts.vue'
import TagsView from 'components/Tags.vue'
import AboutView from 'components/About.vue'

const routes = [
  {path: '/login', component: LoginView, name: 'login'},
  {path: '/posts', component: PostsView},
  {path: '/tags', component: TagsView},
  {path: '/about', component: AboutView},
  {path: '*', redirect: '/posts'}
]

export default {
  routes
}
