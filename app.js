const express = require('express')
const app = express()

// 設定路由
app.get('/', (req, res) => {
  res.send('hello word')
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})