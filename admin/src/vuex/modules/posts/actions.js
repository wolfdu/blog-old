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

function getAllPost ({commit}) {
  return service.getPostList().then(res => {})
}

export {createDraft, getAllPost}
