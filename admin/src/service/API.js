import store from '../vuex/store'

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
        // deleteToken(store)
        // route to login
      }
    }
    let error = new Error(data.message)
    error.status = status
    error.error_message = statusText
    return Promise.reject(error)
  }
}

function getReqHeaders (method, headers = {}) {
  let reqHeaders = new Headers(headers)
  if (method !== 'GET') {
    reqHeaders.append('Content-Type', 'application/json')
  }
  reqHeaders.append('Accept', 'application/json')
  if (store.state.token.token !== null) {
    reqHeaders.append('Authorization', 'Bearer ' + store.state.token.token)
  }
  return reqHeaders
}

function post (url, param = {}, host = process.env.api) {
  url = host + url
  let init = {
    method: 'POST',
    headers: getReqHeaders(this.method),
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(param)
  }
  return fetch(url, init)
      .then(parseResponse)
      .then(checkStatus)
}

function getParamStr (param) {
  let query = []
  Object.keys(param).forEach((item) => {
    query.push(`${item}=${encodeURIComponent(param[item])}`)
  })
  return query.length ? '?' + query.join('&') : ''
}

function get (url, param = {}, host = process.env.api) {
  let params = getParamStr(param)
  url = host + url + params
  let init = {
    method: 'GET',
    headers: getReqHeaders(this.method),
    credentials: 'include',
    cache: 'default',
    mode: 'cors'
  }
  return fetch(url, init)
    .then(parseResponse)
    .then(checkStatus)
}

function patch (url, param = {}, host = process.env.api) {
  url = host + url
  let init = {
    method: 'PATCH',
    headers: getReqHeaders(this.method),
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify(param)
  }
  return fetch(url, init)
    .then(parseResponse)
    .then(checkStatus)
}

function deleteApi (url, param = {}, host = process.env.api) {
  url = host + url
  let init = {
    method: 'DELETE',
    headers: getReqHeaders(this.method),
    credentials: 'include',
    mode: 'cors'
  }
  return fetch(url, init)
    .then(parseResponse)
    .then(checkStatus)
}

export default {post, get, patch, deleteApi}
