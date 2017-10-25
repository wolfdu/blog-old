/**
 * Created by wolfdu on 17-10-23.
 */
'use strict'
import api from './API'

function getPostList (params) {
  return api.get('articles', params)
}

function getPost (id) {
  return api.get(`articles/${id}`)
}

function visit (id, visits) {
  return api.patch(`articles/${id}`, {visits: visits + 1})
}

export default {getPostList, getPost, visit}
