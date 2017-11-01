/**
 * Created by wolfdu on 17-10-25.
 */
'use strict'
import api from './API'

function getTags () {
  return api.get('tags')
}

export default {getTags}
