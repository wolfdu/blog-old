'use strict'

const Router = require('koa-router')
const tagController = require('./tag.controller')
const verifyToken = require('../../middleware/verify-token')

let draftRouter = new Router()

/**
 * 创建token，middleware会init admin账号
 */
draftRouter.post('/tags', verifyToken, tagController.create)
draftRouter.patch('/tags/:id', verifyToken, tagController.modify)
draftRouter.delete('/tags/:id', verifyToken, tagController.deleteTag)
draftRouter.get('/tags', tagController.keywordList)

module.exports = draftRouter
