import api from '../index'

function createToken (user) {
  return api.post('token', user)
}

export default {createToken}
