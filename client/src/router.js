'use strict'

import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('views/index.vue')
const PostsList = () => import('components/posts/List.vue')
const Post = () => import('components/posts/Post.vue')
const Tag = () => import('views/Tag.vue')
const About = () => import('views/About.vue')
const Archive = () => import('views/Archive.vue')

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      { path: '/', component: PostsList, meta: { changeTitle: true } },
      { path: '/post', component: Post, name: 'post', meta: { goTop: true } },
      {
        path: '/tag',
        component: Tag,
        name: 'tag',
        meta: { goTop: true, changeTitle: true }
      },
      {
        path: '/archive',
        component: Archive,
        meta: { goTop: true, changeTitle: true }
      }
    ]
  },
  {
    path: '/about',
    component: About,
    name: 'about',
    meta: { goTop: true, changeTitle: true }
  },
  { path: '*', redirect: '/' }
]

const router = new Router({
  mode: 'history',
  routes
})

router.afterEach((to, from, next) => {
  if (to.matched.some(record => record.meta.goTop)) {
    window.scroll(0, 0)
  }
  let titles = {
    tag: 'Tags | WolfDu后山',
    about: 'About | WolfDu后山',
    archive: 'Archive | WolfDu后山'
  }
  if (to.matched.some(record => record.meta.changeTitle)) {
    let path = to.path.substring(1)
    let title = path ? titles[path] : 'WolfDu后山 | wolfdu.fun'
    document.title = title
  }
})
export default router
