import { draftTypes } from '../../mutation_types'
import postsApi from '../../../service/posts.resource'
import store from '../../store'
import msg from '../toaster-msg'

const showMsg = msg.actions.showMsg

function createDraft ({commit}) {
  return postsApi.createDraft().then(res => {
    if (res.success) {
      commit(draftTypes.DRAFT_CREATE, res.data)
    } else {
      return Promise.reject()
    }
  })
}

/**
 * 获取所有的草稿
 * @param commit
 * @param tagId 查询参数若有值则查询该tagId 下所有的草稿
 * @returns {Promise|Promise.<TResult>|*}
 */
function getAllDraft ({commit}, tagId) {
  return postsApi.getDraftList(tagId).then(res => {
    if (res.success) {
      commit(draftTypes.RECEIVE_ALL_DRAFTS, res.data)
      if (res.data.length) {
        commit(draftTypes.DRAFT_FOCUS, 0)
      }
    }
  }, res => {
    showMsg(store, {content: res.error_message || '获取AllDraft失败'})
  })
}

function focusOnDraft ({commit}, index) {
  commit(draftTypes.DRAFT_FOCUS, index)
}

function editDraftTitle ({commit}, title) {
  commit(draftTypes.DRAFT_TITLE_EDIT, title)
}

function submitDraftTitle ({commit, state}, title) {
  postsApi.modifyDraftTitle(state.currentDraftId, title).then(res => {
    if (res.success) {
      commit(draftTypes.DRAFT_TITLE_MODIFY, title)
      commit(draftTypes.DRAFT_LAST_EDIT_TIME, res.data.lastEditTime)
      commit(draftTypes.DRAFT_TITLE_SAVE)
    }
  }, res => {
    this.showMsg(store, {content: res.error_message || '网络错误,标题保存失败'})
  })
}

function saveDraftTitle ({commit}) {
  commit(draftTypes.DRAFT_TITLE_SAVE)
}

function updateDraft ({commit, state}, content) {
  postsApi.modifyDraftContent(state.currentDraftId, content).then(res => {
    if (res.success) {
      commit(draftTypes.DRAFT_EXCERPT_MODIFY, res.data.excerpt)
      commit(draftTypes.DRAFT_LAST_EDIT_TIME, res.data.lastEditTime)
      commit(draftTypes.DRAFT_SAVE)
    }
  }, res => {
    this.showMsg(store, {content: res.error_message || '保存文章内容失败'})
  })
}

function draftTagsModify ({commit}, lastEditTime) {
  commit(draftTypes.DRAFT_TAG_MODIFY)
  commit(draftTypes.DRAFT_LAST_EDIT_TIME, lastEditTime)
}

function publishDraft ({commit, state}) {
  return postsApi.publish(state.currentDraftId).then(res => {
    if (res.success) {
      commit(draftTypes.DRAFT_PUBLISH, res.data.id)
    }
  })
}

function submitDraftExcerpt ({commit}, {excerpt, lastEditTime}) {
  commit(draftTypes.DRAFT_EXCERPT_MODIFY, excerpt)
  commit(draftTypes.DRAFT_LAST_EDIT_TIME, lastEditTime)
}

function saveDraft ({commit}) {
  commit(draftTypes.DRAFT_SAVE)
}

function editDraft ({commit}) {
  commit(draftTypes.DRAFT_EDIT)
}

function deletePost ({commit, state}) {
  if (state.draftSaved) {
    return postsApi.deleteDraft(state.currentDraftId).then(res => {
      if (res.success) {
        commit(draftTypes.DRAFT_DELETE)
      }
    })
  } else {
    let err = new Error()
    err.error_message = '文章还未保存，稍后再试'
    return Promise.reject(err)
  }
}

export {
  createDraft,
  getAllDraft,
  focusOnDraft,
  editDraftTitle,
  submitDraftTitle,
  saveDraftTitle,
  draftTagsModify,
  publishDraft,
  submitDraftExcerpt,
  editDraft,
  saveDraft,
  deletePost,
  updateDraft
}
