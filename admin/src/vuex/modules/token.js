import { tokenTypes } from '../mutation_types'
import loginService from '../../service/loginService'
import router from '../../router'

const state = {
  token: sessionStorage.getItem('token') || null
}

const actions = {
  createToken ({commit}, user) {
    loginService.createToken(user).then(res => {
      if (res.success) {
        commit(tokenTypes.TOKEN_CREATE, res.data.token)
        router.replace({path: '/posts'})
      } else {
        this.loginError = true
        this.loginErrorMsg = '登录失败··'
      }
    })
  },
  deleteToken ({commit}) {
    commit(tokenTypes.TOKEN_DELETE)
    router.replace({path: '/login'})
  }
}

const mutations = {
  [tokenTypes.TOKEN_CREATE] (state, token) {
    state.token = token
    sessionStorage.setItem('token', token)
  },
  [tokenTypes.TOKEN_DELETE] (state) {
    sessionStorage.removeItem('token')
    state.token = null
  }
}

export default {
  state: state,
  actions: actions,
  mutations: mutations
}
