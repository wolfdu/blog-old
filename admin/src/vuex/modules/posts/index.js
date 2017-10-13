import { DRAFT_CREATE } from '../../mutation_types'
import * as actions from './actions'

const state = {
  all: [],
  currentPostId: null,
  currentPostIndex: -1,
  // post其实只是笔记/草稿,article才是对外发布后,外部可见的文章
  articleId: null,
  title: '',
  postSaved: true,
  postTitleSaved: true
}

const mutations = {
  [DRAFT_CREATE]: function (state, post) {
    state.all.unshift(post)
    state.currentPostIndex = 0
    state.currentPostId = state.all[0].id
    state.title = state.all[0].title
    state.articleId = state.all[0].article
  }
}

export default {
  state: state,
  actions: actions,
  mutations: mutations
}
