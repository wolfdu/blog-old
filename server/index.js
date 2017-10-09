/* eslint no-multiple-empty-lines:0 */
'use strict'
const Koa = require('koa')
const loggerAsync = require('./middleware/logger-async')
const mongoose = require('mongoose')
const config = require('./config/index')
const jwt = require('jsonwebtoken')
const router = require('./router/index')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')

const app = new Koa()
app.use(loggerAsync())

jwt.co_verify = function (jwtString, secretOrPublicKey, options) {
  return function (cb) {
    jwt.verify(jwtString, secretOrPublicKey, options, cb)
  }
}

mongoose.Promise = global.Promise
mongoose.connect(config.mongoConfig.url, config.mongoConfig.opts)

app.use(cors({
  maxAge: 7 * 24 * 60 * 60,
  credentials: true,
  methods: 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE',
  headers: 'Content-Type, Accept, Authorization'
}))

app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.listen(config.app.port, () => {
  console.log(`[demo] start-quick is starting at port ${config.app.port}`)
})
