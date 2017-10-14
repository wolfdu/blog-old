import { DRAFT_CREATE, RECEIVE_ALL_DRAFTS, DRAFT_FOCUS } from '../../mutation_types'
import * as actions from './actions'

const state = {
  all: [],
  currentDraftId: null,
  currentDraftIndex: -1,
  // post其实只是笔记/草稿,article才是对外发布后,外部可见的文章
  articleId: null,
  title: '',
  draftSaved: true,
  draftTitleSaved: true
}

const getters = {
  draftList: state => {
    return state.all
  },
  articleId: state => {
    return state.articleId
  },
  currentDraftId: state => {
    return state.currentDraftId
  },
  currentDraftIndex: state => {
    return state.currentDraftIndex
  },
  draftSaved: state => {
    return state.draftSaved
  },
  draftTitleSaved: state => {
    return state.draftTitleSaved
  }
}

const mutations = {
  [DRAFT_CREATE]: function (state, draft) {
    state.all.unshift(draft)
    state.currentDraftIndex = 0
    state.currentDraftId = state.all[0].id
    state.title = state.all[0].title
    state.articleId = state.all[0].article
  },
  [RECEIVE_ALL_DRAFTS]: function (state, draftList) {
    if (state.draftSaved && state.draftTitleSaved) {
      state.all = draftList
      if (draftList.length === 0) {
        state.currentDraftId = null
        state.currentDraftIndex = -1
      }
    }
  },
  [DRAFT_FOCUS] (state, index) {
    // 当前草稿还没保存的话不允许切换
    if (state.draftSaved && state.draftTitleSaved) {
      state.currentDraftIndex = index
      state.currentDraftId = state.all[index].id
      state.excerpt = state.all[index].excerpt
      state.articleId = state.all[index].article
      state.title = state.all[index].title
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
