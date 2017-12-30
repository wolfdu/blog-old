/**
 * Created by wolfdu on 17-10-28.
 */
'use strict'
import api from './API'

function getAbout() {
  return api.get('about')
}

export default { getAbout }
