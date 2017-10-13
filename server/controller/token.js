'use strict'

const User = require('../models/user')
const Utils = require('../utils/index')
const LOG = require('../utils/logger')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const config = require('../config/index')

/**
 * init admin
 * @returns {Promise.<void>}
 */
let seed = async (ctx, next) => {
  let user = await User.find({}).exec((err, users) => {
    if (err) {
      LOG.error(err)
      throw (new Error('数据seed失败,请debug后重新启动'))
    }
  })

  if (user.length === 0) {
    user = new User({
      name: 'admin',
      username: 'admin',
      password: md5('password').toUpperCase(),
      avatar: '',
      createTime: new Date()
    })
    await user.save().catch(err => {
      LOG.error(err)
      throw (new Error('数据seed失败,请debug后重新启动'))
    })
  }
  await next()
}

/**
 * create token
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
let create = async (ctx, next) => {
  const username = ctx.request.body.username
  const password = ctx.request.body.password
  let user = await User.findOne({username}).exec((err, user) => {
    Utils.print(user)
    if (err) {
      LOG.error(err)
      throw (new Error('数据seed失败,请debug后重新启动'))
    }
  })
  if (user !== null && user.password === password) {
    const token = jwt.sign({
      uid: user._id,
      name: user.name,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60// 1 hours
    }, config.jwt.cert)
    Utils.print(token)
    ctx.status = 200
    ctx.body = {
      success: true,
      data: {
        uid: user._id,
        name: user.name,
        token
      }
    }
  } else {
    ctx.response.status = 401
    ctx.response.body = {
      message: '用户名或密码错误'
    }
  }
}

let check = async (ctx, next) => {
  ctx.status = 200
  ctx.body = {
    success: true,
    message: '验证通过'
  }
}

module.exports = {create, seed, check}
