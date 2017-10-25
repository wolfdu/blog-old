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
  const tag = ctx.query.tagId
  let queryOpt = {hidden: false}
  if (tag) {
    queryOpt.tags = {$all: [tag]}
  }
  const result = await Article.find(queryOpt)
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

let modify = async (ctx, next) => {
  const id = ctx.params.id
  const modifyOptions = ctx.request.body
  let result = await Article.findByIdAndUpdate(id, {$set: modifyOptions}, {new: true}).exec((err, article) => {
    if (err) {
      LOG.error(err)
      if (err.name === 'CastError') {
        console.log('id不存在')
      } else {
        console.log('内部错误')
      }
    }
    console.log(article)
  })
  result = result.toObject()
  ctx.status = 200
  ctx.body = {
    success: true,
    data: result
  }
}

module.exports = {articleList, articleDetail, modify}
