/**
 * Created by wolfdu on 17-10-28.
 */
'use strict'

const About = require('../models/about')
const LOG = require('../utils/logger')

function initAbout () {
  return new About({
    content: 'about wolf du'
  })
}

let seed = async (ctx, next) => {
  let about = await About.find().exec((err, about) => {
    if (err) {
      console.log(err)
      ctx.throw(500, 'about数据seed失败,请debug后重新启动')
    } else {
      console.log(about)
    }
  })
  if (!about.length) {
    let newAbout = initAbout()
    newAbout.save().catch(err => {
      LOG.error(err)
      throw (new Error('about数据seed失败,请debug后重新启动'))
    })
  }
  await next()
}

let getAbout = async (ctx, next) => {
  let about = await About.find().exec((err, about) => {
    if (err) {
      console.log(err)
      ctx.throw(500, '系统错误')
    } else {
      console.log(about[0])
    }
  })
  ctx.status = 200
  ctx.body = {
    success: true,
    data: about[0]
  }
}

let modify = async (ctx, next) => {
  const content = ctx.request.body.content
  let about = await About.findOneAndUpdate({}, {content}).exec((err, about) => {
    if (err) {
      console.log(err)
      ctx.throw(500, '系统错误')
    } else {
      console.log(about)
    }
  })
  ctx.status = 200
  ctx.body = {
    success: true,
    data: about
  }
}

module.exports = {seed, getAbout, modify}
