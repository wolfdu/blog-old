import api from '../index'

export default {
  createDraft () {
    return api.post('drafts')
  }
}
