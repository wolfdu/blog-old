import { draftTypes } from '../../mutation_types'
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
  draftTitle: state => {
    return state.title
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
  },
  currentTags: state => {
    return state.all[state.currentDraftIndex].tags
  }
}

const mutations = {
  [draftTypes.DRAFT_CREATE]: function (state, draft) {
    state.all.unshift(draft)
    state.currentDraftIndex = 0
    state.currentDraftId = state.all[0].id
    state.title = state.all[0].title
    state.articleId = state.all[0].article
  },
  [draftTypes.RECEIVE_ALL_DRAFTS]: function (state, draftList) {
    if (state.draftSaved && state.draftTitleSaved) {
      state.all = draftList
      if (draftList.length === 0) {
        state.currentDraftId = null
        state.currentDraftIndex = -1
      }
    }
  },
  [draftTypes.DRAFT_FOCUS] (state, index) {
    // 当前草稿还没保存的话不允许切换
    if (state.draftSaved && state.draftTitleSaved) {
      state.currentDraftIndex = index
      state.currentDraftId = state.all[index].id
      state.excerpt = state.all[index].excerpt
      state.articleId = state.all[index].article
      state.title = state.all[index].title
    }
  },
  [draftTypes.DRAFT_TITLE_EDIT] (state) {
    if (state.draftTitleSaved) {
      state.all[state.currentDraftIndex].draftPublished = false
      state.draftTitleSaved = false
    }
  },
  [draftTypes.DRAFT_TITLE_MODIFY] (state, title) {
    state.title = title
    state.all[state.currentDraftIndex].title = title
  },
  [draftTypes.DRAFT_LAST_EDIT_TIME] (state, lastEditTime) {
    state.all[state.currentDraftIndex].lastEditTime = lastEditTime
  },
  [draftTypes.DRAFT_TITLE_SAVE] (state) {
    if (!state.draftTitleSaved) {
      state.draftTitleSaved = true
    }
  },
  [draftTypes.DRAFT_TAG_MODIFY] (state) {
    state.all[state.currentDraftIndex].draftPublished = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
