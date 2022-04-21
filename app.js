const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
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

// 設定路由
app.get('/', (req, res) => {
  // 拿到全部的 Todo 資料
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(err => console.error(err))
})

app.get('/todos/new', (req, res) => {
  return res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name

  // 方法一
  // 存在伺服器的資料
  const todo = new Todo({ name })
  // 透過.save把資料送回資料庫
  return todo.save()
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))

  // 方法二
  // 直接用 mongoose 語法告訴資料庫創建一筆資料
  /*
  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
  */
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})