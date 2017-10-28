/**
 * Created by wolfdu on 17-10-23.
 */
'use strict'

const Router = require('koa-router')
const draftController = require('../controller/article')

let articleRouter = new Router()

articleRouter.get('/articles', draftController.articleList)
articleRouter.get('/articles/:id', draftController.articleDetail)
articleRouter.patch('/articles/:id', draftController.modify)

module.exports = articleRouter
