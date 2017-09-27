import { TOKEN_CREATE, TOKEN_DELETE } from '../mutation_types'
import * as actions from './actions/token'

const state = {
  token: sessionStorage.getItem('token')
}

const mutations = {
  [TOKEN_CREATE] (state, token) {
    state.token = token
    sessionStorage.setItem('token', token)
  },
  [TOKEN_DELETE] (state) {
    sessionStorage.removeItem('token')
    state.token = null
  }
}

export default {
  state: state,
  actions: actions,
  mutations: mutations
}
