/**
 * Created by wolfdu on 17-10-23.
 */
'use strict'
import api from './API'

function getPostList (params) {
  return api.get('articles', params)
}

export default {getPostList}
