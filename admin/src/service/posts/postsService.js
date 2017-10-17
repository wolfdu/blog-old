import api from '../index'

function createDraft () {
  return api.post('drafts')
}

function getDraftList (tag) {
  return api.get('drafts', tag)
}

function modifyDraftTitle (draftId, title) {
  return api.patch(`drafts/${draftId}`, {title})
}

function modifyDraftTags (draftId, tags) {
  return api.patch(`drafts/${draftId}`, {tags})
}

export default {createDraft, getDraftList, modifyDraftTitle, modifyDraftTags}
