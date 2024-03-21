const User = require('../models/user')

const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


loginRouter.post('/', async (req, res) => {
  const findUser = await User.findOne({ username: req.body.username })

  if (!findUser) res.status(404).send({ error: 'User not exist' })

  const resultCompare = await bcrypt.compare(
    req.body.password,
    findUser.passwordHash
  )

  if (resultCompare) {
    const token = jwt.sign(
      {
        username: findUser.username,
        id: findUser._id
      },
      process.env.SECRET
    )

    res.status(201).send({
      token,
      username: findUser.username,
      name: findUser.name
    })
  }
})

module.exports = loginRouter