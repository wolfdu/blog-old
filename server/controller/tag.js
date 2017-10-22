/* eslint-disable standard/object-curly-even-spacing */
'use strict'
const LOG = require('../utils/logger')
const Tag = require('../models/tag')
const VError = require('verror')
const Draft = require('../models/draft')
const Article = require('../models/article')

let create = async (ctx, next) => {
  const tagName = ctx.request.body.name
  if (tagName) {
    let tag = await Tag.findOne({name: tagName}).exec((err, tag) => {
      if (err) {
        LOG.error(err)
      } else {
        console.log(tag ? tag.toJSON() : tag)
      }
    })
    if (!tag) {
      const newTag = new Tag({name: tagName})
      tag = await newTag.save((err, tag) => {
        if (err) {
          LOG.error(err)
        } else {
          console.log(tag ? tag.toJSON() : tag)
        }
      })
    }
    ctx.status = 200
    ctx.body = {
      success: true,
      data: tag
    }
  } else {
    console.error(400, '标签名缺失')
  }
}

let keywordList = async (ctx, next) => {
  const keyword = ctx.query['keyword']
  const queryOption = {}
  if (keyword) {
    queryOption.name = {$regex: `^${keyword}`}
  }
  const tags = await Tag.find(queryOption).exec((err, tags) => {
    if (err) {
      LOG.error(err)
    } else {
      console.log(tags)
    }
  })
  ctx.status = 200
  ctx.body = {
    success: true,
    data: tags
  }
}

let modify = async (ctx, next) => {
  const id = ctx.params.id
  const tagName = ctx.request.body.newName
  const tag = await Tag.findOne({name: tagName}).exec((err, tag) => {
    if (err) {
      let verror = new VError(err)
      console.log(verror)
      ctx.throw(500, '系统错误')
    }
  })
  if (tag) {
    ctx.status = 200
    ctx.body = {
      success: false,
      data: tag
    }
  } else {
    await Tag.update({_id: id}, {$set: {name: tagName}}).exec((err, tag) => {
      if (err) {
        let verror = new VError(err)
        console.log(verror)
        ctx.throw(500, '系统错误')
      } else {
        console.log('修改成功')
        console.log(tag)
      }
    })
    ctx.status = 200
    ctx.body = {
      success: true
    }
  }
}

let deleteTag = async (ctx, next) => {
  const id = ctx.params.id
  await Draft.update({}, {$pull: {tags: id}}).exec(err => {
    if (err) {
      let verr = new VError(err)
      console.error(verr)
      ctx.throw(500, '系统错误')
    }
  })
  await Article.update({}, {$pull: {tags: id}}).exec(err => {
    if (err) {
      let verr = new VError(err)
      console.error(verr)
      ctx.throw(500, '系统错误')
    }
  })
  await Tag.remove({_id: id}).exec(err => {
    if (err) {
      let verr = new VError(err)
      console.error(verr)
      ctx.throw(500, '系统错误')
    }
  })
  ctx.status = 200
  ctx.body = {
    success: true
  }
}

module.exports = {create, keywordList, modify, deleteTag}
