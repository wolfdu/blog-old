'use strict'
const path = require('path')
const _ = require('lodash')
const fs = require('fs')
const dev = require('./dev')

function getRootPath() {
  return path.dirname(__dirname)
}

let config = {
  app: {
    name: 'blog',
    port: 3000,
    adminPath: '/api' // 后台路径
  },
  debug: false,
  env: 'production',
  mongoConfig: {
    // 数据库配置
    url: 'mongodb://localhost:27017/blog',
    opts: {
      useMongoClient: true,
      user: '',
      pass: ''
    }
  },
  jwt: {
    cert: 'blog'
  },
  dir: {
    root: getRootPath(),
    log: path.join(__dirname, '..', 'logs'),
    static: path.join(getRootPath(), 'static')
  }
}

// 本地调试环境
if (process.env.NODE_ENV === 'development') {
  config = _.merge(config, dev)
}
// 私有配置
if (process.env.NODE_ENV === 'production') {
  if (fs.existsSync(path.join(__dirname, '/prod.js'))) {
    config = _.merge(config, require('./prod.js'))
  }
}

module.exports = config
