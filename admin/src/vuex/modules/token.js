import { tokenTypes } from '../mutation_types'
import tokenApi from '../../service/token.resource'
import router from '../../router'
import store from '../store'
import msg from './toaster-msg'

const showMsg = msg.actions.showMsg

const state = {
  token: sessionStorage.getItem('token') || null
}

const actions = {
  createToken ({commit}, user) {
    tokenApi.createToken(user).then(res => {
      if (res.success) {
        commit(tokenTypes.TOKEN_CREATE, res.data.token)
        router.replace({path: '/dashboard'})
        let msg = {content: 'Welcome Wolf Du !!!', type: 'success'}
        showMsg(store, msg)
      } else {
        let msg = {content: res.error_message || '登陆失败'}
        showMsg(store, msg)
      }
    }, res => { showMsg(store, {content: res.error_message || '登陆失败'}) })
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
  state,
  actions,
  mutations
}
