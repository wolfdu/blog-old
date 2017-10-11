'use strict'

const User = require('../models/user')
const Utils = require('../utils/index')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const config = require('../config/index')

/**
 * init admin
 * @returns {Promise.<void>}
 */
exports.seed = async (ctx, next) => {
  let user = await User.find({}).exec((err, users) => {
    if (err) {
      Utils.logger.error(err)
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
      Utils.logger.error(err)
      throw (new Error('数据seed失败,请debug后重新启动'))
    })
  }
  await next()
}

exports.create = async (ctx, next) => {
  const username = ctx.request.body.username
  const password = ctx.request.body.password
  let user = await User.findOne({username}).exec((err, user) => {
    Utils.print(user)
    if (err) {
      Utils.logger.error(err)
      throw (new Error('数据seed失败,请debug后重新启动'))
    }
  })
  if (user !== null) {
    if (user.password === password) {
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
      ctx.throw(401, '密码错误')
    }
  } else {
    ctx.throw(401, '用户名错误')
  }
}

exports.check = async (ctx, next) => {
  ctx.status = 200
  ctx.body = {
    success: true,
    message: '验证通过'
  }
}