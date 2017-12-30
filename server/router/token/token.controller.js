'use strict'

const User = require('../../models/user')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const config = require('../../config/index')
const logger = require('../../utils/logger')

let getAdminUser = function() {
  return new User({
    name: 'admin',
    username: 'admin',
    password: md5('password').toUpperCase(),
    avatar: '',
    createTime: new Date()
  })
}

/**
 * init admin
 * @returns {Promise.<void>}
 */
let seed = async (ctx, next) => {
  try {
    let user = await User.find({}).exec()
    if (user.length === 0) {
      user = getAdminUser()
      await user.save()
    }
    await next()
  } catch (err) {
    ctx.throw(err)
  }
}

function getToken(user) {
  return jwt.sign(
    {
      uid: user._id,
      name: user.name,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 hours
    },
    config.jwt.cert
  )
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
  try {
    let user = await User.findOne({ username }).exec()
    ctx.status = 200
    if (user && user.password === password) {
      const token = getToken(user)
      ctx.body = {
        success: true,
        data: { uid: user._id, name: user.name, token }
      }
    } else {
      logger.error('用户名或密码错误', { username: username })
      ctx.body = { error_message: '用户名或密码错误' }
    }
  } catch (err) {
    logger.debug('token error')
    ctx.throw(err)
  }
}

let check = async (ctx, next) => {
  ctx.status = 200
  ctx.body = {
    success: true,
    message: '验证通过'
  }
}

module.exports = { create, seed, check }
