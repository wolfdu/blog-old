/**
 * Created by wolfdu on 17-12-21 下午7:24.
 * @author wolfdu
 * @version 2.0
 */

'use strict'
import {
  EDIT_POST,
  EDIT_POST_TITLE,
  FOCUS_ON_FIRST_POST,
  GET_POST,
  GET_POSTS,
  MODIFY_POST_TAG,
  PUBLISH_POST,
  REFRESH_POSTS,
  SAVE_POST,
  SAVE_POST_TITLE
} from '../mutation_types'
import * as postsApi from '../../service/posts.resource'
import store from '../store'
import msg from './toaster-msg'

const showMsg = msg.actions.showMsg

const state = {
  postList: [],
  post: null,
  postSaved: true,
  postTitleSaved: true,
  postId: null,
  postTitle: '',
  currentPostIndex: null,
  postTags: [],
  readyEditPost: false
}

const getters = {
  postList: state => {
    return state.postList
  },
  post: state => {
    return state.post
  },
  postSaved: state => {
    return state.postSaved
  },
  postTitleSaved: state => {
    return state.postTitleSaved
  },
  postId: state => {
    return state.postId
  },
  postTitle: state => {
    return state.postTitle
  },
  postTags: state => {
    return state.postTags
  }
}

const actions = {
  getPost ({commit}, queryParam) {
    postsApi.getPost(queryParam.postId).then(res => {
      if (res.success) {
        commit(GET_POST, {index: queryParam.index, post: res.data})
      }
    }, res => {
      showMsg(store, {content: res.error_message || '获取Post失败'})
    })
  },
  getAllPost ({commit}, param) {
    postsApi.getPostList(param).then(res => {
      if (res.success) {
        commit(GET_POSTS, res.data)
        postsApi.getPost(res.data[0].id).then(res => {
          if (res.success) {
            commit(GET_POST, {index: 0, post: res.data})
          }
        })
      }
    }, res => {
      showMsg(store, {content: res.error_message || '获取Posts失败'})
    })
  },
  createPost ({commit}) {
    postsApi.createPost().then(res => {
      if (res.success) {
        commit(REFRESH_POSTS, {index: null, post: res.data})
        commit(GET_POST, {index: 0, post: res.data})
      } else {
        return Promise.reject()
      }
    })
  },
  editPostTitle ({commit}, title) {
    commit(EDIT_POST_TITLE, title)
  },
  submitPostTitle ({commit, state}, title) {
    postsApi.updatePostTitle(state.postId, title).then(res => {
      if (res.success) {
        const data = res.data
        commit(SAVE_POST_TITLE, data)
        commit(REFRESH_POSTS, {index: state.currentPostIndex, post: data})
        commit(FOCUS_ON_FIRST_POST)
      }
    }, res => {
      showMsg(store, {content: res.error_message || '网络错误,标题保存失败'})
    })
  },
  addPostTag ({commit, state}, addTagId) {
    let postTags = state.postTags
    if (!postTags.some(item => item.id === addTagId)) {
      let tagIds = postTags.map(item => item.id)
      tagIds.push(addTagId)
      postsApi.modifyPostTags(state.postId, tagIds).then(res => {
        if (res.success) {
          commit(MODIFY_POST_TAG, res.data)
          commit(REFRESH_POSTS, {index: state.currentPostIndex, post: res.data})
        }
      })
    }
  },
  deletePostTag ({commit, state}, deleteTagId) {
    let tagIds = state.postTags.map(i => i.id)
    tagIds.splice(tagIds.findIndex(function (id) {
      return id === deleteTagId
    }), 1)
    postsApi.modifyPostTags(state.postId, tagIds).then(res => {
      if (res.success) {
        commit(MODIFY_POST_TAG, res.data)
        commit(REFRESH_POSTS, {index: state.currentPostIndex, post: res.data})
      }
    }, res => {
      showMsg(store, {content: res.error_message || '网络错误,修改标签失败'})
    })
  },
  editPost ({commit}) {
    commit(EDIT_POST)
  },
  submitPostContent ({commit}, postContent) {
    postsApi.updatePostContent(state.postId, postContent).then(res => {
      if (res.success) {
        const data = res.data
        commit(SAVE_POST, data)
        commit(REFRESH_POSTS, {index: state.currentPostIndex, post: data})
        commit(FOCUS_ON_FIRST_POST)
      }
    }, res => {
      showMsg(store, {content: res.error_message || '保存文章内容失败'})
    })
  },
  publish ({commit, state}) {
    if (state.postSaved && state.postTitleSaved && !state.post.draftPublished) {
      postsApi.publishPost(state.postId).then(res => {
        if (res.success) {
          commit(PUBLISH_POST, res.data.id)
          commit(REFRESH_POSTS, {index: state.currentPostIndex, post: state.post})
          showMsg(store, {content: '发布成功', type: 'success'})
        }
      }, res => {
        showMsg(store, {content: res.error_message || '发布失败'})
      })
    } else {
      showMsg(store, {content: '当前文章正在保存中或该文章已发布过了，请稍后再试', type: 'info'})
    }
  },
  deletePost ({commit, state}) {
    if (state.postSaved) {
      postsApi.deletePost(state.postId).then(res => {
        if (res.success) {
          commit(REFRESH_POSTS, {index: state.currentPostIndex, post: null})
          postsApi.getPost(state.postList[0].id).then(res => {
            if (res.success) {
              commit(GET_POST, {index: 0, post: res.data})
            }
          })
        }
      })
    } else {
      showMsg(store, {content: '文章还未保存，稍后再试', type: 'info'})
    }
  }
}

const mutations = {
  [GET_POSTS] (state, posts) {
    state.postList = posts
  },
  [REFRESH_POSTS] (state, {index, post}) {
    if (index !== null) {
      state.postList.splice(index, 1)
    }
    if (post) {
      state.postList.unshift(post)
    }
  },
  [GET_POST] (state, {index, post}) {
    state.post = post
    state.postId = post.id
    state.postTitle = post.title
    state.currentPostIndex = index
    state.postTags = post.tags
  },
  [EDIT_POST_TITLE] (state, title) {
    state.postTitle = title
    state.postTitleSaved = false
  },
  [SAVE_POST_TITLE] (state, post) {
    state.post = post
    state.postTitleSaved = true
  },
  [MODIFY_POST_TAG] (state, post) {
    state.postTags = post.tags
    state.post = post
  },
  [EDIT_POST] (state) {
    state.postSaved = false
  },
  [SAVE_POST] (state, post) {
    state.post = post
    state.postSaved = true
  },
  [FOCUS_ON_FIRST_POST] (state) {
    state.currentPostIndex = 0
  },
  [PUBLISH_POST] (state, articleId) {
    state.post.article = articleId
    state.post.draftPublished = true
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
