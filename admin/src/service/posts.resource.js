import api from './API'

export function createPost () {
  return api.post('drafts')
}

export function getPostList (param) {
  return api.get('drafts', param)
}

export function updatePostTitle (draftId, title) {
  return api.patch(`drafts/${draftId}`, {title})
}

export function modifyPostTags (draftId, tags) {
  return api.patch(`drafts/${draftId}`, {tags})
}

export function updatePostContent (draftId, content) {
  return api.patch(`drafts/${draftId}`, {content})
}

export function getPost (postId) {
  return api.get(`drafts/${postId}`)
}

export function publishPost (draftId) {
  return api.post(`drafts/${draftId}`)
}

export function deletePost (draftId) {
  return api.deleteApi(`drafts/${draftId}`)
}
