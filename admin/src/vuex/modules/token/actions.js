import * as types from '../../mutation_types'
import service from '../../../service/login/index'

function createToken ({commit}, {username, password}) {
  return service.createToken(username, password).then(res => {
    if (res.success) {
      commit(types.TOKEN_CREATE, res.data.token)
    }
  })
}

function deleteToken ({commit}) {
  commit(types.TOKEN_DELETE)
    // 之所以这样做是因为这个actions有的时候并不是在组件内调用,而是在拿到http请求时,也就是需要被自己封装的fetch函数给调用
    // 所以这个时候,this并不能拿到vm
  this.$router.go('login')
}

export {createToken, deleteToken}
