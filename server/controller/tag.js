/* eslint-disable standard/object-curly-even-spacing */
'use strict'
const LOG = require('../utils/logger')
const Tag = require('../models/tag')

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

module.exports = {create, keywordList}
