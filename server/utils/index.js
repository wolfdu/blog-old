'use strict'

const Logger = require('mini-logger')
const config = require('../config/index')
const print = require('debug')('blog')
const utils = {}

/**
 * debug plugin
 */
utils.print = print

/**
 * log记录 用法: utils.logger.error(new Error(''))
 */
utils.logger = Logger({
  dir: config.dir.log,
  format: 'YYYY-MM-DD-[{category}][.log]'
})

/**
 * 封装返回 error信息
 * @param ctx
 * @param status 异常状态
 * @param msg 异常信息
 */
utils.error = function (ctx, {status, msg}) {
  //  TODO 改成异步？？？
  ctx.response.status = status
  ctx.response.body = {
    message: msg
  }
}

// 将时间输出为统一的格式
// eslint-disable-next-line no-extend-native
Date.prototype.format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1,                 // 月份
    'd+': this.getDate(),                    // 日
    'h+': this.getHours(),                   // 小时
    'm+': this.getMinutes(),                 // 分
    's+': this.getSeconds(),                 // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds()             // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

module.exports = utils

