'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const draftSchema = new Schema(
  {
    title: String,
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ],
    createTime: { type: Date },
    lastEditTime: { type: Date, default: Date.now },
    excerpt: String,
    content: String,
    article: {
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    },
    draftPublished: Boolean,
    thumb: String
  },
  { versionKey: false, skipVersioning: { tags: true } }
)

draftSchema.set('toJSON', { getters: true, virtuals: true })
draftSchema.set('toObject', { getters: true, virtuals: true })

draftSchema.path('createTime').get(function(v) {
  return new Date(v).format('yyyy-MM-dd hh:mm:ss')
})

draftSchema.path('lastEditTime').get(function(v) {
  return new Date(v).format('yyyy-MM-dd hh:mm:ss')
})

module.exports = mongoose.model('Draft', draftSchema)
