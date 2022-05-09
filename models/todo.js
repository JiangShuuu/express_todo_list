const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // 設定為此DB資料的搜尋依據, 提升搜尋速度.
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Todo', todoSchema)
