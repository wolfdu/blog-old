import api from '../index'

function createTags (name) {
  return api.post('tags', {name})
}

export default {createTags}
