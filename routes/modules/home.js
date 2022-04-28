const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/', (req, res) => {
  // 拿到全部的 Todo 資料
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) // desc 反序
    .then(todos => res.render('index', { todos }))
    .catch(err => console.log(err))
})

module.exports = router