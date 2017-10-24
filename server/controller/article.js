/**
 * Created by wolfdu on 17-10-23.
 */
'use strict'
const Article = require('../models/article')
const VError = require('verror')
const LOG = require('../utils/logger')

let getArticleArr = function (result) {
  let resultArr = []
  if (result.length) {
    result.forEach((article) => {
      article = article.toObject()
      resultArr.push(article)
    })
  }
  return resultArr
}

let articleList = async (ctx, next) => {
  const limit = ~~ctx.query.limit || 10
  const page = ~~ctx.query.page
  let skip = page ? (limit * (page - 1)) : 0
  const result = await Article.find({hidden: false})
    .populate('tags')
    .select('title visits tags createTime lastEditTime excerpt')
    .sort({createTime: -1})
    .limit(limit)
    .skip(skip)
    .exec((err, result) => {
      if (err) {
        console.log(err)
        ctx.throw(500, '系统错误')
      } else {
        console.log(result)
      }
    })
  ctx.status = 200
  ctx.body = {
    success: true,
    data: {
      articles: getArticleArr(result)
    }
  }
}

let articleDetail = async (ctx, next) => {
  const id = ctx.params.id
  const article = await Article.findOne({_id: id}).populate('tags').exec((err, article) => {
    if (err) {
      let verr = new VError(err)
      LOG.error(verr)
      console.log(err)
      ctx.throw(500, '系统异常')
    } else {
      console.log(article.toJSON())
    }
  })
  ctx.status = 200
  ctx.body = {
    success: true,
    data: article
  }
}

module.exports = {articleList, articleDetail}
