const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .populate('user', { username: 1 })
    .then(blogs => {
      res.status(200).json(blogs)
    })
    .catch(err => {
      console.error(err)
    })
})

blogsRouter.delete('/:id', async (req, res) => {
  const verifiedUser = jwt.verify(req.token, process.env.SECRET)
  
  if (!verifiedUser.id) {
    return res.status(401).send({ error: 'token invalid' })
  }

  const validUser = jwt.decode(req.token)
  const blogToDelete = await Blog.findById(req.params.id)

  if (blogToDelete.user.toString() !== validUser.id) {
    return res.status(401).send({ error: 'unauthorised user'})
  }

  try {
    await Blog.deleteOne({ _id: req.params.id })
    res.status(204).end()
  } catch(err) {
    res.status(404).send({ error: 'Blog doesn\'t exist or is already deleted' })
  }
})

blogsRouter.post('/', async (req, res) => {
  const verifiedUser = jwt.verify(req.token, process.env.SECRET)
  
  if (!verifiedUser.id) {
    return res.status(401).send({ error: 'token invalid' })
  }

  if (!req.body.likes || req.body.likes === undefined) {
    req.body.likes = 0
  }
  if (!req.body.title || !req.body.url) {
    return res.status(400).send({ error: 'missing field \'Title\' or \'Url\'' })
  }

  const validUser = await User.findById(verifiedUser.id)

  const newBlog = {
    ...req.body,
    user: validUser._id
  }

  const blog = new Blog(newBlog)

  const savedBlog = await blog.save()

  validUser.blogs =  validUser.blogs.concat(savedBlog._id)
  await validUser.save()

  res.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
  const verifiedUser = jwt.verify(req.token, process.env.SECRET)
  
  if (!verifiedUser.id) {
    return res.status(401).send({ error: 'token invalid' })
  }

  const validUser = jwt.decode(req.token)
  const blogToUpdate = await Blog.findById(req.params.id)
  
  if (blogToUpdate.user.toString() !== validUser.id) {
    return res.status(401).send({ error: 'unauthorised user'})
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  
  res.status(201).json(updatedBlog)
})

module.exports = blogsRouter