import store from '../vuex/store'
import {deleteToken} from '../vuex/actions/token'

function parseResponse (response) {
  return Promise.all([response.status, response.statusText, response.json()])
}

function checkStatus ([status, statusText, data]) {
  if (status >= 200 && status < 300) {
    return data
  } else {
    if (status === 401) {
      if (data.error === 'token expired') {
        alert('token已过期,请注意内容保存,并重新登录')
      } else if (data.error === 'invalid token') {
        deleteToken(store)
      }
    }
    let error = new Error(statusText)
    error.status = status
    error.error_message = data
    return Promise.reject(error)
  }
}

export default {
  post (url, param = {}, headers = {}, host = process.env.api) {
    let reqHeaders = new Headers(headers)
    reqHeaders.append('Content-Type', 'application/json')
    reqHeaders.append('Accept', 'application/json')
    if (store.state.token.token !== null) {
      reqHeaders.append('Authorization', 'Bearer ' + store.state.token.token)
    }
    url = host + url
    var init = {
      method: 'POST',
      headers: reqHeaders,
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(param)
    }

    return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
  }
}
