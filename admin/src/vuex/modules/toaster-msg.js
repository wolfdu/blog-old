'use strict'

import { HIDE_MSG, SHOW_MSG } from '../mutation_types'

function getInitMsgState() {
  return {
    type: '',
    content: '',
    title: ''
  }
}

const state = {
  message: {
    type: '',
    content: '',
    title: ''
  }
}

const actions = {
  showMsg({ commit }, msg) {
    msg.type = msg.type || 'error'
    commit(SHOW_MSG, msg)
  },
  hideMsg({ commit }) {
    commit(HIDE_MSG)
  }
}

const mutations = {
  [SHOW_MSG](state, msg) {
    state.message = { ...msg }
  },
  [HIDE_MSG](state) {
    state.message = getInitMsgState()
  }
}

export default {
  state,
  actions,
  mutations
}
