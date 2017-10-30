import api from './API'
import md5 from 'md5'

function createToken (user) {
  user.password = md5(user.password).toUpperCase()
  return api.post('token', user)
}

export default {createToken}
