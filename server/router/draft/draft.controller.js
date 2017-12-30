/* eslint-disable standard/object-curly-even-spacing */
'use strict'
const Draft = require('../../models/draft')
const Article = require('../../models/article')
const trim = require('lodash/trim')

function getDraft() {
  return new Draft({
    draftPublished: false,
    title: 'new post',
    createTime: new Date(),
    lastEditTime: new Date(),
    excerpt: '',
    content: '',
    article: null
  })
}

let create = async (ctx, next) => {
  let draft = getDraft()
  try {
    draft = await draft.save()
    ctx.status = 200
    ctx.body = { success: true, data: draft }
  } catch (err) {
    ctx.throw(err)
  }
}

function buildDraft2Obj(draftArr) {
  let resultArr = []
  if (draftArr.length) {
    draftArr.forEach((draft, index, arr) => {
      draft = draft.toObject()
      resultArr.push(draft)
    })
  }
  return resultArr
}

function getDraftStatus(postType) {
  const status = {
    published: true,
    draft: false
  }
  return status[postType]
}

function getDraftListQueryOpt(param) {
  let queryOpt = {}
  if (param.postType && param.postType !== 'all') {
    queryOpt.draftPublished = getDraftStatus(param.postType)
  }
  if (param.tag !== undefined) {
    queryOpt.tags = { $all: [param.tag] }
  }
  return queryOpt
}

let draftList = async (ctx, next) => {
  const param = ctx.query
  const queryOpt = getDraftListQueryOpt(param)
  // const limit = ~~ctx.query.limit || 10
  // const page = ~~ctx.query.page
  // let skip = page ? (limit * (page - 1)) : 0
  try {
    const draftArr = await Draft.find(queryOpt)
      .select(
        'title tags createTime lastEditTime excerpt article draftPublished'
      )
      .populate('tags')
      .sort({ lastEditTime: -1 })
      .exec()
    const resultArr = buildDraft2Obj(draftArr)
    ctx.status = 200
    ctx.body = { success: true, data: resultArr }
  } catch (err) {
    ctx.throw(err)
  }
}

function getExcerptAndThumb(content) {
  let result = {}
  const regexp = /^<!--\n([^]*)\n-->/
  let optStrArr = content.match(regexp)
  if (optStrArr) {
    optStrArr = optStrArr[1].split(',')
    optStrArr.forEach(function(item) {
      let optArr = item.split('->')
      this[trim(optArr[0])] = trim(optArr[1])
    }, result)
  }
  return result
}

function getModifyOpt(queryParams) {
  // default opt
  let modifyOpt = queryParams
  let content = queryParams.content
  if (content) {
    modifyOpt.excerpt = ''
    modifyOpt.thumb = ''
    Object.assign(modifyOpt, getExcerptAndThumb(content))
  }
  modifyOpt.lastEditTime = new Date()
  modifyOpt.draftPublished = false
  return modifyOpt
}

let modify = async (ctx, next) => {
  const id = ctx.params.id
  const modifyOptions = getModifyOpt(ctx.request.body)
  try {
    let result = await Draft.findByIdAndUpdate(
      id,
      { $set: modifyOptions },
      { new: true }
    )
      .populate('tags')
      .exec()
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

/**
 * 获取文章细节
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
let draftDetail = async (ctx, next) => {
  const id = ctx.params.id
  try {
    const draft = await Draft.findOne({ _id: id })
      .populate('tags')
      .exec()
    ctx.status = 200
    ctx.body = { success: true, data: draft }
  } catch (err) {
    ctx.throw(err)
  }
}

let deleteDraft = async (ctx, next) => {
  const id = ctx.params.id
  try {
    const draft = await Draft.findOne({ _id: id })
      .select('article')
      .exec()
    ctx.status = 200
    if (draft) {
      if (!draft.article) {
        await Draft.remove({ _id: id }).exec()
        ctx.body = { success: true }
      } else {
        ctx.body = { error_message: '已发布文章的草稿不能删除' }
      }
    } else {
      ctx.body = { error_message: '该草稿id不存在' }
    }
  } catch (err) {
    ctx.throw(err)
  }
}

let getArticleOption = function(articleOpt) {
  delete articleOpt._id
  delete articleOpt.id
  delete articleOpt.article
  delete articleOpt.draftPublished
  delete articleOpt.createTime
  return articleOpt
}

function initArticle(articleOpt) {
  articleOpt.createTime = articleOpt.lastEditTime
  delete articleOpt.lastEditTime
  articleOpt.visits = 0
  articleOpt.comments = []
  articleOpt.hidden = false
  return articleOpt
}

/**
 * 发布草稿
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
let publish = async (ctx, next) => {
  const id = ctx.params.id
  try {
    const draft = await Draft.findOne({ _id: id }).exec()
    if (!draft.title) {
      ctx.throw(400, 'The title can not be blank')
    } else if (!draft.excerpt) {
      ctx.throw(400, 'The excerpt can not be blank, please writ excerpt')
    } else if (!draft.content) {
      ctx.throw(400, 'The content can not be blank')
    }
    draft.draftPublished = true
    draft.lastEditTime = new Date()
    let articleOpt = getArticleOption(draft.toObject())
    if (draft.article) {
      let article = await Article.findByIdAndUpdate(
        draft.article,
        { $set: articleOpt },
        { new: true }
      ).exec()
      await draft.save()
      ctx.status = 200
      ctx.body = { success: true, data: article }
    } else {
      articleOpt = initArticle(articleOpt)
      let article = new Article(articleOpt)
      article = await article.save()
      article = article.toObject()
      draft.article = article._id
      await draft.save()
      ctx.status = 200
      ctx.body = { success: true, data: article }
    }
  } catch (err) {
    ctx.throw(err)
  }
}

module.exports = {
  create,
  draftList,
  modify,
  draftDetail,
  deleteDraft,
  publish
}
