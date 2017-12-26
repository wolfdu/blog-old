import api from './API'

export function createTag (name) {
  return api.post('tags', {name})
}

function searchTagsByWord (keyword) {
  return api.get('tags', {keyword})
}

function getAllTags () {
  return api.get('tags')
}

function modifyTag (id, newName) {
  return api.patch(`tags/${id}`, {newName})
}

function deleteTag (id) {
  return api.deleteApi(`tags/${id}`)
}

export default {createTag, searchTagsByWord, getAllTags, modifyTag, deleteTag}
