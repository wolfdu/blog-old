'use strict'

module.exports = function () {
  return async function (ctx, next) {
    const start = new Date()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    await next()
  }
}
