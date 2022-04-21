const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
require('dotenv').config()

const app = express()

const Todo = require('./models/todo')

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

// 設定路由
app.get('/', (req, res) => {
  // 拿到全部的 Todo 資料
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(err => console.error(err))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})