/**
 * Created by wolfdu on 17-10-23.
 */
'use strict'

const Router = require('koa-router')
const draftController = require('./article.controller')

let articleRouter = new Router()

articleRouter.get('/articles', draftController.articleList)
articleRouter.get('/articles/count', draftController.articlesCount)
articleRouter.get('/articles/:id', draftController.articleDetail)
articleRouter.patch('/articles/:id', draftController.modify)

module.exports = articleRouter
