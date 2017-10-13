import api from '../index'

function createDraft () {
  return api.post('drafts')
}

function getPostList (tag) {
  return api.get('drafts', tag)
}

export default {createDraft, getPostList}
