import * as types from '../../mutation_types'
import service from '../../../service/posts/index'

function createDraft ({commit}) {
  return service.createDraft().then(res => {
    if (res.success) {
      commit(types.DRAFT_CREATE, res.data)
    } else {
      return Promise.reject()
    }
  })
}

function getAllDraft ({commit}) {
  return service.getDraftList().then(res => {
    if (res.success) {
      commit(types.RECEIVE_ALL_DRAFTS, res.data)
      if (res.data.length) {
        commit(types.DRAFT_FOCUS, 0)
      }
    }
  })
}

function focusOnDraft ({commit}, index) {
  commit(types.DRAFT_FOCUS, index)
}

export {createDraft, getAllDraft, focusOnDraft}
