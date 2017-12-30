/**
 * Created by wolfdu on 17-10-23.
 */
'use strict'
const Article = require('../../models/article')

let getArticleArr = function(result) {
  let resultArr = []
  if (result.length) {
    result.forEach(article => {
      article = article.toObject()
      resultArr.push(article)
    })
  }
  return resultArr
}

function getQueryOpt(query) {
  let result = { hidden: false }
  const tag = query.tagId
  if (tag) {
    result.tags = { $all: [tag] }
  }
  return result
}

function getSortParam(page) {
  return page ? { createTime: -1 } : { visits: -1 }
}

let articleList = async (ctx, next) => {
  const limit = ~~ctx.query.limit || 10
  const page = ~~ctx.query.page
  let skip = page ? limit * (page - 1) : 0
  let queryOpt = getQueryOpt(ctx.query)
  let sortParam = getSortParam(page)
  try {
    const result = await Article.find(queryOpt)
      .populate('tags')
      .select('title visits like tags createTime lastEditTime excerpt thumb')
      .sort(sortParam)
      .skip(skip)
      .limit(limit)
      .exec()
    ctx.status = 200
    ctx.body = {
      success: true,
      data: {
        articles: getArticleArr(result)
      }
    }
  } catch (err) {
    ctx.throw(err)
  }
}

let articlesCount = async (ctx, next) => {
  try {
    const count = await Article.count({})
    ctx.status = 200
    ctx.body = {
      success: true,
      data: {
        count
      }
    }
  } catch (err) {
    ctx.throw(err)
  }
}

let articleDetail = async (ctx, next) => {
  const id = ctx.params.id
  try {
    const article = await Article.findOne({ _id: id })
      .populate('tags')
      .exec()
    ctx.status = 200
    ctx.body = {
      success: true,
      data: article
    }
  } catch (err) {
    ctx.throw(err)
  }
}

let modify = async (ctx, next) => {
  const id = ctx.params.id
  const modifyOptions = ctx.request.body
  try {
    let result = await Article.findByIdAndUpdate(
      id,
      { $set: modifyOptions },
      { new: true }
    ).exec()
    result = result.toObject()
    ctx.status = 200
    ctx.body = {
      success: true,
      data: result
    }
  } catch (err) {
    ctx.throw(err)
  }
}

module.exports = { articleList, articleDetail, modify, articlesCount }
