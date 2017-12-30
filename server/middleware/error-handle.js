/* eslint-disable camelcase */
'use strict'
const _ = require('lodash')

const errorHandleMiddle = function() {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      let error_message = err.message
      if (err.errors && typeof err.errors === 'object') {
        _.mapValues(err.errors, item => {
          if (item.message) {
            error_message = item.message
          }
        })
      }
      ctx.body = { error_message: error_message }
      ctx.app.emit('error', err, ctx)
    }
  }
}

module.exports = errorHandleMiddle
