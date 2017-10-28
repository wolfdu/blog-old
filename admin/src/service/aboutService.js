/**
 * Created by wolfdu on 17-10-28.
 */
import api from './index'

function getAbout () {
  return api.get('about')
}

function modify (content) {
  return api.post('about', {content})
}

export default {getAbout, modify}
