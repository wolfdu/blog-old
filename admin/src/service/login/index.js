import api from '../index'

export default {
  createToken ({username, password}) {
    return api.post('token', {username, password})
  }
}
