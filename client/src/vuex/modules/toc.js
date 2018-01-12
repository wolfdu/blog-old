/**
 * Created by wolfdu on 18-1-12 上午11:29.
 * @author wolfdu
 * @version 2.0
 */

'use strict'
import { FIXED_TOC, INIT_TOC, RESET_TOC, SHOW_TOC } from '../mutation_types'
import { getTocOption } from 'src/utils/tocUtils'
import tocbot from 'tocbot'

const state = {
  tocVisible: false,
  isInited: false,
  tocFixed: false
}

const getters = {
  tocVisible: state => {
    return state.tocVisible
  },
  isInited: state => {
    return state.isInited
  },
  tocFixed: state => {
    return state.tocFixed
  }
}

const actions = {
  showToc ({ commit }) {
    commit(SHOW_TOC)
  },
  initToc({ commit }) {
    tocbot.init(getTocOption())
    commit(INIT_TOC)
  },
  fixedToc({ commit }) {
    commit(FIXED_TOC)
  },
  resetToc({ commit }) {
    commit(RESET_TOC)
  },
  refreshToc() {
    tocbot.refresh()
  }
}

const mutations = {
  [SHOW_TOC](state) {
    state.tocVisible = true
  },
  [INIT_TOC](state) {
    state.isInited = true
  },
  [FIXED_TOC](state) {
    state.tocFixed = !state.tocFixed
  },
  [RESET_TOC](state) {
    state.tocVisible = false
    state.tocFixed = false
    state.isInited = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
