'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tagSchema = new Schema(
  {
    name: String
  },
  { versionKey: false }
)

tagSchema.set('toJSON', { getters: true, virtuals: true })
tagSchema.set('toObject', { getters: true, virtuals: true })

module.exports = mongoose.model('Tag', tagSchema)
