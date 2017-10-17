'use strict'

const Router = require('koa-router')
const tagController = require('../controller/tag')
const verifyToken = require('../middleware/verify-token')

let draftRouter = new Router()

/**
 * 创建token，middleware会init admin账号
 */
draftRouter.post('/tags', verifyToken, tagController.create)

module.exports = draftRouter
