import {tokenTypes} from '../../mutation_types'

function createToken ({commit}, token) {
  commit(tokenTypes.TOKEN_CREATE, token)
}

function deleteToken ({commit}, router) {
  commit(tokenTypes.TOKEN_DELETE)
  router.replace({path: '/login'})
}

export {createToken, deleteToken}
