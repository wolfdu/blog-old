'use strict'

const config = require('../config/index.js')
const jwt = require('jsonwebtoken')

module.exports = async (ctx, next) => {
  const authorization = ctx.get('Authorization')
  if (authorization === '') {
    this.throw(401, "no token detected in http header 'Authorization'")
  }
  const token = authorization.split(' ')[1]
  let tokenContent
  try {
    tokenContent = await jwt.co_verify(token, config.jwt.cert)
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      ctx.throw(401, 'token expired')
    }
    ctx.throw(401, 'invalid token')
  }
  console.log('鉴权通过')
  ctx.token = tokenContent
  await next()
}
