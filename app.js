const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const app = express()
const { redirect } = require('express/lib/response')


require('dotenv').config()


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))


// 設定路由
app.get('/', (req, res) => {
  // 拿到全部的 Todo 資料
  Todo.find()
    .lean()
    .sort({ _id: 'asc' }) // desc 反序
    .then(todos => res.render('index', { todos }))
    .catch(err => console.log(err))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

// 創造資料
app.post('/todos', (req, res) => {
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

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(err => console.log(err))
})

// edit頁面
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(err => console.log(err))
})

// 修改功能
app.put('/todos/:id', (req, res) => {
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
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})