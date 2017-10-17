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
        if (!tag) {
          const newTag = new Tag({name: tagName})
          tag = newTag.save((err, tag) => {
            if (err) {
              LOG.error(err)
            } else {
              console.log(tag.toJSON())
            }
          })
        }
      }
    })
    ctx.status = 200
    ctx.body = {
      success: true,
      data: tag
    }
  } else {
    console.error(400, '标签名缺失')
  }
}

module.exports = {create}
