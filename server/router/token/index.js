'use strict'

const Router = require('koa-router')
const tokenController = require('./token.controller')
const verifyToken = require('../../middleware/verify-token')

let tokenRouter = new Router()

/**
 * 创建token，middleware会init admin账号
 */
tokenRouter.post('/token', tokenController.seed, tokenController.create)
tokenRouter.get('/token/check', verifyToken, tokenController.check)

module.exports = tokenRouter
