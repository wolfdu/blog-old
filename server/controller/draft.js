/* eslint-disable standard/object-curly-even-spacing */
'use strict'
const Draft = require('../models/draft')
const Article = require('../models/article')
const VError = require('verror')
const LOG = require('../utils/logger')

function getDraft () {
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
  draft = await draft.save().catch(err => {
    LOG.error(err)
  })
  console.log(draft.toJSON())
  ctx.status = 200
  ctx.body = {
    success: true,
    data: draft
  }
}

let draftList = async (ctx, next) => {
  const tag = ctx.query.tag
  const queryOpt = {}
  if (tag !== undefined) {
    queryOpt.tags = {'$all': [tag]}
  }
  console.log(queryOpt)
  // validate populate result
  const draftArr = await Draft.find(queryOpt)
    .select('title tags createTime lastEditTime excerpt article draftPublished')
    .populate('tags')
    .sort({lastEditTime: -1})
    .exec((err, drafts) => {
      if (err) {
        LOG.error(err)
        console.log(err)
      }
    })
  const resultArr = []
  if (draftArr.length) {
    draftArr.forEach((draft, index, arr) => {
      draft = draft.toObject()
      resultArr.push(draft)
    })
  }
  ctx.status = 200
  ctx.body = {
    success: true,
    data: resultArr
  }
}

let modify = async (ctx, next) => {
  const id = ctx.params.id
  const modifyOptions = ctx.request.body
  if (modifyOptions.content) {
    const contentArr = modifyOptions.content.split('<!-- more -->')
    if (contentArr.length) {
      modifyOptions.excerpt = contentArr[0]
    } else {
      modifyOptions.excerpt = ''
    }
  }
  modifyOptions.lastEditTime = new Date()
  modifyOptions.draftPulished = false
  let result = await Draft.findByIdAndUpdate(id, {$set: modifyOptions}, {new: true})
    .populate('tags')
    .exec((err, draft) => {
      if (err) {
        LOG.error(err)
        if (err.name === 'CastError') {
          console.log('id不存在')
        } else {
          console.log('内部错误')
        }
      }
      console.log(draft)
    })
  result = result.toObject()
  ctx.status = 200
  ctx.body = {
    success: true,
    data: result
  }
}

let draftDetail = async (ctx, next) => {
  const id = ctx.params.id
  const draft = await Draft.findOne({_id: id}).populate('tags').exec((err, draft) => {
    if (err) {
      let verr = new VError(err)
      LOG.error(verr)
      console.log(err)
    } else {
      console.log(draft.toJSON())
    }
  })
  ctx.status = 200
  ctx.body = {
    success: true,
    data: draft
  }
}

let deleteDraft = async (ctx, next) => {
  const id = ctx.params.id
  const draft = await Draft.findOne({_id: id}).select('article').exec((err, draft) => {
    if (err) {
      LOG.error(err)
      console.log(err)
    } else {
      console.log(draft.toJSON())
    }
  })
  if (draft) {
    if (!draft.article) {
      await Draft.remove({_id: id}).exec(err => {
        if (err) {
          LOG.error(err)
          console.log(err)
        }
      })
    } else {
      console.log('已发布文章的草稿不能删除')
    }
  } else {
    console.log('该草稿id不存在')
  }
  ctx.status = 200
  ctx.body = {
    success: true
  }
}

let getArticleOption = function (articleOpt) {
  delete articleOpt._id
  delete articleOpt.id
  delete articleOpt.article
  delete articleOpt.draftPublished
  delete articleOpt.createTime
  return articleOpt
}

let publish = async (ctx, next) => {
  const id = ctx.params.id
  const draft = await Draft.findOne({_id: id}).exec((err, draft) => {
    if (err) {
      let verr = new VError(err)
      LOG.error(verr)
      ctx.throw(500, '系统错误')
    } else {
      console.log(draft)
    }
  })
  if (!draft.title) {
    ctx.throw(400, 'The title can not be blank')
  } else if (!draft.excerpt) {
    ctx.throw(400, 'The excerpt can not be blank, please insert "<!--more-->" writ excerpt')
  } else if (!draft.content) {
    ctx.throw(400, 'The content can not be blank')
  }
  draft.draftPublished = true
  draft.lastEditTime = new Date()
  const articleOpt = getArticleOption(draft.toObject())
  if (draft.article) {
    let article = await Article.findByIdAndUpdate(draft.article, {$set: articleOpt}, {new: true})
      .exec((err, article) => {
        if (err) {
          let verr = new VError(err)
          LOG.error(verr)
          ctx.throw(500, '系统错误')
        }
        console.log(article)
      })
    await draft.save().catch(err => {
      let verr = new VError(err)
      LOG.error(verr)
      ctx.throw(500, '系统异常')
    })
    ctx.status = 200
    ctx.body = {
      success: true,
      data: article
    }
  } else {
    articleOpt.createTime = articleOpt.lastEditTime
    delete articleOpt.lastEditTime
    articleOpt.visits = 0
    articleOpt.comments = []
    articleOpt.hidden = false
    let article = new Article(articleOpt)
    article = await article.save().catch(err => {
      let verr = new VError(err)
      LOG.error(verr)
      ctx.throw(500, '系统错误')
    })
    article = article.toObject()
    draft.article = article._id
    await draft.save().catch(err => {
      let verr = new VError(err)
      LOG.error(verr)
      ctx.throw(500, '系统异常')
    })
    ctx.status = 200
    ctx.body = {
      success: true,
      data: article
    }
  }
}

module.exports = {create, draftList, modify, draftDetail, deleteDraft, publish}
