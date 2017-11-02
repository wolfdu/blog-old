/**
 * Created by wolfdu on 17-10-28.
 */
'use strict'

const Router = require('koa-router')
const aboutController = require('./about.controller')
const verifyToken = require('../../middleware/verify-token')

let aboutRouter = new Router()

aboutRouter.get('/about', aboutController.seed, aboutController.getAbout)
aboutRouter.post('/about', verifyToken, aboutController.modify)

module.exports = aboutRouter
