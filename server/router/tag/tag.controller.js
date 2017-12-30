/* eslint-disable standard/object-curly-even-spacing */
'use strict'
const Tag = require('../../models/tag')
const Draft = require('../../models/draft')
const Article = require('../../models/article')

/**
 * create tag by tagName
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
let create = async (ctx, next) => {
  const tagName = ctx.request.body.name
  try {
    let tag = await Tag.findOne({ name: tagName }).exec()
    if (!tag) {
      const newTag = new Tag({ name: tagName })
      tag = await newTag.save()
    }
    ctx.status = 200
    ctx.body = { success: true, data: tag }
  } catch (err) {
    ctx.throw(err)
  }
}

/**
 * get tags by keyword
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
let keywordList = async (ctx, next) => {
  const keyword = ctx.query['keyword']
  const queryOption = {}
  if (keyword) {
    queryOption.name = { $regex: `^${keyword}` }
  }
  try {
    const tags = await Tag.find(queryOption).exec()
    ctx.status = 200
    ctx.body = {
      success: true,
      data: tags
    }
  } catch (err) {
    ctx.throw(err)
  }
}

// 修改tagName
let modify = async (ctx, next) => {
  const id = ctx.params.id
  const tagName = ctx.request.body.newName
  try {
    const tag = await Tag.findOne({ name: tagName }).exec()
    if (tag) {
      ctx.status = 200
      ctx.body = { success: false, error_message: '已存在同名标签' }
    } else {
      let newTag = await Tag.update(
        { _id: id },
        { $set: { name: tagName } }
      ).exec()
      ctx.status = 200
      ctx.body = { success: true, data: newTag }
    }
  } catch (err) {
    ctx.throw(err)
  }
}

let deleteTag = async (ctx, next) => {
  const id = ctx.params.id
  try {
    await Draft.update({}, { $pull: { tags: id } }).exec()
    await Article.update({}, { $pull: { tags: id } }).exec()
    await Tag.remove({ _id: id }).exec()
    ctx.status = 200
    ctx.body = { success: true }
  } catch (err) {
    ctx.throw(err)
  }
}

module.exports = { create, keywordList, modify, deleteTag }
