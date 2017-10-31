'use strict'

import {msgTypes} from '../mutation_types'

function getInitMsgState () {
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
  showMsg ({commit}, msg) {
    msg.type = msg.type || 'error'
    commit(msgTypes.SHOW_MSG, msg)
  },
  hideMsg ({commit}) {
    commit(msgTypes.HIDE_MSG)
  }
}

const mutations = {
  [msgTypes.SHOW_MSG] (state, msg) {
    state.message = {...msg}
  },
  [msgTypes.HIDE_MSG] (state) {
    state.message = getInitMsgState()
  }
}

export default {
  state,
  actions,
  mutations
}
