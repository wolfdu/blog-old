import api from '../index'

function createToken ({username, password}) {
  return api.post('token', {username, password})
}

export default {createToken}
