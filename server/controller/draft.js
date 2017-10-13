'use strict'
const Draft = require('../models/draft')
const Utils = require('../utils/index')

function getDraft () {
  return new Draft({
    title: 'new post',
    createTime: new Date(),
    lastEditTime: new Date(),
    excerpt: '',
    content: '',
    article: null,
    draftPublished: false
  })
}

exports.create = async (ctx, next) => {
  /**
   * post body
   * {
    "title":"标题",
    "tags":[],
    "excerpt":"摘要 或 首段",
    "content":"文章内容"
    }
   */
  let draft = getDraft()
  draft = await draft.save().catch(err => {
    Utils.logger.error(err)
    // error
  })

  ctx.status = 200
  ctx.body = {
    success: true,
    data: draft
  }
}
