'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  avatar: String,
  createTime: String
})
module.exports = mongoose.model('User', userSchema)
