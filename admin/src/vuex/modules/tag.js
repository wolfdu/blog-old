/**
 * Created by wolfdu on 17-12-27 下午8:20.
 * @author wolfdu
 * @version 2.0
 */

'use strict'
import { GET_TAGS, MODIFY_TAG, REFRESH_TAGS } from '../mutation_types'
import * as tagsApi from 'service/tag.resource'
import store from '../store'
import msg from './toaster-msg'

const showMsg = msg.actions.showMsg

const state = {
  tags: []
}

const getters = {
  tags: state => {
    return state.tags
  }
}

const actions = {
  getAllTags({ commit }) {
    tagsApi.getAllTags().then(
      res => {
        if (res.success) {
          commit(GET_TAGS, res.data)
        }
      },
      res => {
        showMsg(store, { content: res.error_message || '获取tags失败' })
      }
    )
  },
  modifyTag({ commit }, param) {
    tagsApi.modifyTag(param.tagId, param.newName).then(
      res => {
        if (res.success) {
          commit(REFRESH_TAGS, { index: param.index, tagName: param.newName })
        } else {
          showMsg(store, { content: res.error_message || '存在同名tag' })
        }
      },
      res => {
        showMsg(store, {
          content: res.error_message || '网络错误，修改tag失败'
        })
      }
    )
  }
}

const mutations = {
  [GET_TAGS](state, tags) {
    state.tags = tags
  },
  [MODIFY_TAG](state, tagInfo) {
    state.tags[tagInfo.index] = tagInfo.tag
  },
  [REFRESH_TAGS](state, { index, tagName }) {
    let tag = null
    if (index !== null) {
      tag = state.tags.splice(index, 1)[0]
      tag.name = tagName
    }
    if (tagName) {
      state.tags.unshift(tag)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
