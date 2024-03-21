const {
  after,
  beforeEach,
  describe,
  test
} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

describe('initialization of user', () => {
  beforeEach(async () => {
    console.log('CONSOLE START FROM BEFORE EACH')
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('somepassword', 10)

    const someUser = new User({
      username: 'someuser',
      name: 'someuser',
      passwordHash
    })
    await someUser.save()
  })

  after(() => mongoose.connection.close())

  test('getting all users', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  describe.only('creating new user', () => {
    test.only('creation is successed', async () => {
      const usersAtStart = await User.find({})

      const newUser = {
        username: 'admin',
        name: 'admin',
        password: 'adminpassword'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await User.find({})
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    })
  })
})