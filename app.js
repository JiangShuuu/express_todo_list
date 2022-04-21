const express = require('express')
const mongoose = require('mongoose') 

const MONGODB_URI = "mongodb+srv://globelex65:Globelex1418@cluster0.a4qoq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const app = express()
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

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

// 設定路由
app.get('/', (req, res) => {
  res.send('hello word')
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})