const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/new', (req, res) => {
  return res.render('new')
})

// 創造資料
router.post('/', (req, res) => {
  const name = req.body.name

  // 方法一
  // 存在伺服器的資料
  const todo = new Todo({ name })
  // 透過.save把資料送回資料庫
  return todo.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))

  // 方法二
  // 直接用 mongoose 語法告訴資料庫創建一筆資料
  /*
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
  */
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(err => console.log(err))
})

// edit頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(err => console.log(err))
})

// 修改功能
router.put('/:id', (req, res) => {
  const id = req.params.id
  const { name , isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

// 刪除功能
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router