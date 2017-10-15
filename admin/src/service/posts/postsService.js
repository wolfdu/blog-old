import api from '../index'

function createDraft () {
  return api.post('drafts')
}

function getDraftList (tag) {
  return api.get('drafts', tag)
}

export default {createDraft, getDraftList}
