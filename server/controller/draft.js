/* eslint-disable standard/object-curly-even-spacing */
'use strict'
const Draft = require('../models/draft')
const Utils = require('../utils/index')
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
    // error
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
  Utils.print(queryOpt)
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
      console.log(draft)
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
  console.log(result)
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
      LOG.error(err)
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

module.exports = {create, draftList, modify, draftDetail, deleteDraft}
