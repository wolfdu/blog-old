'use strict'

const config = require('../../config')
const bunyan = require('bunyan')

const logger = bunyan.createLogger({
  name: 'wolfDuBlog',
  serializers: {
    req: bunyan.stdSerializers.req,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  },
  streams: [
    {
      level: 'info',
      stream: process.stdout
    }, {
      level: 'trace',
      stream: process.stdout
    },
    {
      level: 'debug',
      stream: process.stderr
    },
    {
      type: 'rotating-file',
      level: 'error',
      path: config.dir.log + '\\' + config.env + '-error.log',
      period: '1d',   // daily rotation
      count: 3        // keep 3 back copies
    }
  ]
})

module.exports = logger
