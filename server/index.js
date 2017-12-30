/* eslint no-multiple-empty-lines:0 */
'use strict'
const Koa = require('koa')
const loggerAsync = require('./middleware/logger-async')
const logger = require('./utils/logger')
const errorHandle = require('./middleware/error-handle')
const mongoose = require('mongoose')
const config = require('./config')
const jwt = require('jsonwebtoken')
const router = require('./router/index')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

const app = new Koa()
app.use(loggerAsync())
// log记录
// router use : this.logger.error('msg')
app.use(async (ctx, next) => {
  ctx.logger = logger
  await next()
})
app.use(errorHandle())

jwt.co_verify = function(jwtString, secretOrPublicKey, options) {
  return function(cb) {
    jwt.verify(jwtString, secretOrPublicKey, options, cb)
  }
}
mongoose.Promise = global.Promise

mongoose.connect(config.mongoConfig.url, config.mongoConfig.opts)

app.use(
  cors({
    maxAge: 7 * 24 * 60 * 60,
    credentials: true,
    allowMethods: ['GET', 'HEAD', 'OPTIONS', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type', 'Accept', 'Authorization']
  })
)

app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.on('error', (err, ctx) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error('error', err)
  }
})

app.listen(config.app.port, () => {
  console.log(`[demo] start-quick is starting at port ${config.app.port}`)
})
