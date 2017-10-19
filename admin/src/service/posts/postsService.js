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

function modifyDraftContent (draftId, content) {
  return api.patch(`drafts/${draftId}`, {content})
}

function getDraft (draftId) {
  return api.get(`drafts/${draftId}`)
}

function publish (draftId) {
  return api.post(`drafts/${draftId}`)
}

function deleteDraft (draftId) {
  return api.deleteApi(`drafts/${draftId}`)
}

export default {createDraft, getDraftList, modifyDraftTitle, modifyDraftTags, modifyDraftContent, getDraft, publish, deleteDraft}
