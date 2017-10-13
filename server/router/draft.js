'use strict'

const Router = require('koa-router')
const draftController = require('../controller/draft')
const verifyToken = require('../middleware/verify-token')

let draftRouter = new Router()

/**
 * 创建token，middleware会init admin账号
 */
draftRouter.post('/drafts', verifyToken, draftController.create)
draftRouter.get('/drafts', verifyToken, draftController.draftList)

module.exports = draftRouter
