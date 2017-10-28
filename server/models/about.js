/**
 * Created by wolfdu on 17-10-28.
 */
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const aboutSchema = new Schema({
  content: String
}, {versionKey: false})
module.exports = mongoose.model('About', aboutSchema)
