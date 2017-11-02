/**
 * Created by wolfdu on 17-10-28.
 */
'use strict'

const About = require('../../models/about')

function initAbout () {
  return new About({
    content: 'about wolf du'
  })
}

/**
 * 初始化about内容
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
let seed = async (ctx, next) => {
  try {
    let about = await About.find().exec()
    if (!about.length) {
      let newAbout = initAbout()
      newAbout.save()
    }
    await next()
  } catch (err) {
    ctx.throw(err)
  }
}

/**
 * 获取about内容
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
let getAbout = async (ctx, next) => {
  try {
    let about = await About.find().exec()
    ctx.status = 200
    ctx.body = {
      success: true,
      data: about[0]
    }
  } catch (err) {
    ctx.throw(err)
  }
}

let modify = async (ctx, next) => {
  const content = ctx.request.body.content
  try {
    let about = await About.findOneAndUpdate({}, {content}).exec()
    ctx.status = 200
    ctx.body = {
      success: true,
      data: about
    }
  } catch (err) {
    ctx.throw(err)
  }
}

module.exports = {seed, getAbout, modify}
