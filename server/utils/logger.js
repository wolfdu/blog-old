'use strict'
const Logger = require('mini-logger')
const config = require('../config/index')

/**
 * log记录 用法: utils.logger.error(new Error(''))
 */
let logger = Logger({
  dir: config.dir.log,
  format: 'YYYY-MM-DD-[{category}][.log]'
})

module.exports = logger
