import { draftTypes } from '../../mutation_types'
import service from '../../../service/posts/postsService'

function createDraft ({commit}) {
  return service.createDraft().then(res => {
    if (res.success) {
      commit(draftTypes.DRAFT_CREATE, res.data)
    } else {
      return Promise.reject()
    }
  })
}

function getAllDraft ({commit}) {
  return service.getDraftList().then(res => {
    if (res.success) {
      commit(draftTypes.RECEIVE_ALL_DRAFTS, res.data)
      if (res.data.length) {
        commit(draftTypes.DRAFT_FOCUS, 0)
      }
    }
  })
}

function focusOnDraft ({commit}, index) {
  commit(draftTypes.DRAFT_FOCUS, index)
}

function editDraftTitle ({commit}) {
  commit(draftTypes.DRAFT_TITLE_EDIT)
}

function submitDraftTitle ({commit, state}, title) {
  return service.modifyDraftTitle(state.currentDraftId, title).then(res => {
    if (res.success) {
      commit(draftTypes.DRAFT_TITLE_MODIFY, title)
      commit(draftTypes.DRAFT_LAST_EDIT_TIME, res.data.lastEditTime)
    }
  })
}

function saveDraftTitle ({commit}) {
  commit(draftTypes.DRAFT_TITLE_SAVE)
}

function draftTagsModify ({commit}, lastEditTime) {
  commit(draftTypes.DRAFT_TAG_MODIFY)
  commit(draftTypes.DRAFT_LAST_EDIT_TIME, lastEditTime)
}

export {
  createDraft,
  getAllDraft,
  focusOnDraft,
  editDraftTitle,
  submitDraftTitle,
  saveDraftTitle,
  draftTagsModify
}
