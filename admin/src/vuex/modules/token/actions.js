import * as types from '../../mutation_types'
import service from '../../../service/login/loginService'

function createToken ({commit}, param) {
  return service.createToken(param.user).then(res => {
    if (res.success) {
      commit(types.TOKEN_CREATE, res.data.token)
      param.router.replace({path: '/posts'})
    }
  })
}

function deleteToken ({commit}, router) {
  commit(types.TOKEN_DELETE)
  router.replace({path: '/login'})
}

export {createToken, deleteToken}
