const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  if (req.body.password.length < 10) {
    return res
      .status(401)
      .send({ error: 'Your password is less then 10 symbols' })
  }

  if (!(req.body.username || req.body.password)) {
    return res
      .status(401)
      .send({ error: 'Fields username or password is missed' })
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10)

  const newUser = new User({
    username: req.body.username,
    name: req.body.name,
    passwordHash: passwordHash
  })

  const addedUser = await newUser.save()
  res.json(addedUser)
})

module.exports = usersRouter