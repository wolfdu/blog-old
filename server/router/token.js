'use strict'

const Router = require('koa-router')
const tokenController = require('../controller/token')
const verifyToken = require('../middleware/verify-token')

let tokenRouter = new Router()

tokenRouter.post('/token', tokenController.seed, tokenController.create)
tokenRouter.get('/token/check', verifyToken, tokenController.check)

module.exports = tokenRouter
