'use strict'
const Router = require('koa-router')
const config = require('../config/index')
const token = require('./token')
const draft = require('./draft')

let router = new Router()

router.use(config.app.adminPath, token.routes(), token.allowedMethods())
router.use(config.app.adminPath, draft.routes(), draft.allowedMethods())

module.exports = router
