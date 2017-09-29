'use strict'
const Router = require('koa-router')
const config = require('../config/index')
const token = require('./token')

let router = new Router()

router.use(config.app.adminPath, token.routes(), token.allowedMethods())

module.exports = router
