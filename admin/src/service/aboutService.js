/**
 * Created by wolfdu on 17-10-28.
 */
import api from './API'

function getAbout () {
  return api.get('about')
}

function modify (content) {
  return api.post('about', {content})
}

export default {getAbout, modify}
