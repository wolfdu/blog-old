/**
 * Created by wolfdu on 17-10-23.
 */
'use strict'

const Router = require('koa-router')
const draftController = require('../controller/article')

let articleRouter = new Router()

/**
 * 创建token，middleware会init admin账号
 */
articleRouter.get('/articles', draftController.articleList)
articleRouter.get('/articles/:id', draftController.articleDetail)

module.exports = articleRouter
