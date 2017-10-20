'use strict'
const Logger = require('mini-logger')
const config = require('../config/index')

/**
 * log记录
 */
let logger = Logger({
  dir: config.dir.log,
  format: 'YYYY-MM-DD-[{category}][.log]'
})

module.exports = logger
