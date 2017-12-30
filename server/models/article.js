/**
 * Created by wolfdu on 17-10-19.
 */
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema(
  {
    title: String,
    visits: {
      type: Number,
      default: 0
    },
    like: {
      type: Number,
      default: 0
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ],
    createTime: {
      type: Date
    },
    lastEditTime: {
      type: Date,
      default: Date.now
    },
    hidden: Boolean,
    excerpt: String,
    content: String,
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comment'
      }
    ],
    thumb: String
  },
  { versionKey: false, skipVersioning: { tags: true } }
)

articleSchema.set('toJSON', { getters: true, virtuals: true })
articleSchema.set('toObject', { getters: true, virtuals: true })

articleSchema.path('createTime').get(function(v) {
  return new Date(v).format('yyyy-MM-dd hh:mm:ss')
})
articleSchema.path('lastEditTime').get(function(v) {
  return new Date(v).format('yyyy-MM-dd hh:mm:ss')
})

module.exports = mongoose.model('Article', articleSchema)
