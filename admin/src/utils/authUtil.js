'use strict'

function isLogin () {
  return !!sessionStorage.getItem('token')
}

export {isLogin}
