const bcrypt = require('bcryptjs')

const Todo = require('../todo') // 載入 todo model
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      // 等待裡面事情做完, 再進行下一個then
      return Promise.all(Array.from(
        { length: 10 }, // 生成 ['', '', '', 10個]
        (value, i) => Todo.create({ name: `name-${i}`, userId})
      )) // [1, 2, 30].map
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
})

