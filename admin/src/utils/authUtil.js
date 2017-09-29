'use strict'
export function isLogin () {
  return !!sessionStorage.getItem('token')
}
