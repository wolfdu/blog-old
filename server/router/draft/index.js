'use strict'

const Router = require('koa-router')
const draftController = require('./draft.controller')
const verifyToken = require('../../middleware/verify-token')

let draftRouter = new Router()

/**
 * 创建token，middleware会init admin账号
 */
draftRouter.post('/drafts', verifyToken, draftController.create)
draftRouter.post('/drafts/:id', verifyToken, draftController.publish)
draftRouter.get('/drafts', verifyToken, draftController.draftList)
draftRouter.get('/drafts/:id', verifyToken, draftController.draftDetail)
draftRouter.patch('/drafts/:id', verifyToken, draftController.modify)
draftRouter.delete('/drafts/:id', verifyToken, draftController.deleteDraft)

module.exports = draftRouter
