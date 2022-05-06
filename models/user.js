const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    defult: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)