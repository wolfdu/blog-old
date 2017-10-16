import api from '../index'

function createDraft () {
  return api.post('drafts')
}

function getDraftList (tag) {
  return api.get('drafts', tag)
}

function modifyDraftTitle (draftId, title) {
  return api.patch(`drafts/${draftId}`, title)
}

export default {createDraft, getDraftList, modifyDraftTitle}
