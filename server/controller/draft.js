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
  const draftArr = await Draft.find(queryOpt)
    .select('title tags createTime lastEditTime excerpt article draftPublished')
    .populate('tags')
    .sort({ lastEditTime: -1})
    .exec().catch(err => {
      // fixme
      LOG.error(err)
      this.throw(500, '内部错误')
    })
  const resultArr = []
  if (draftArr.length) {
    draftArr.forEach((draft, index, arr) => {
      draft = draft.toObject()
      resultArr.push(draft)
      Utils.print(draft)
    })
  }
  this.status = 200
  this.body = {
    success: true,
    data: resultArr
  }
}

module.exports = {create, draftList}
