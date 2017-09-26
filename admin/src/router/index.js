import LoginView from 'components/Login/Login.vue'
import PostsView from 'components/Posts/Posts.vue'

// import store from '../vuex/store'

const routes = [
  {path: '/login', component: LoginView, name: 'login'},
  {path: '/posts', component: PostsView},
  {path: '*', redirect: '/posts'}
]

export default {
  routes
}
