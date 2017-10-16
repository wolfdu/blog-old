import { tokenTypes } from '../../mutation_types'
import * as actions from './actions'

const state = {
  token: sessionStorage.getItem('token')
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
