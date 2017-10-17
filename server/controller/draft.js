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
    .populate('Tag')
    .sort({lastEditTime: -1})
    .exec((err, drafts) => {
      if (err) {
        LOG.error(err)
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

module.exports = {create, draftList}
