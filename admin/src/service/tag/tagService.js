import api from '../index'

function createTags (name) {
  return api.post('tags', {name})
}

function searchTagsByWord (keyword) {
  return api.get('tags', {keyword})
}

export default {createTags, searchTagsByWord}
