const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.status(200).json(blogs)
    })
    .catch(err => {
      console.error(err)
    })
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.deleteOne({ _id: req.params.id })
    res.status(204).end()
  } catch(err) {
    res.status(404).send({ error: 'Blog doesn\'t exist or is already deleted'})
  }
})

blogsRouter.post('/', (req, res) => {
  if (!req.body.likes || req.body.likes === undefined) {
    req.body.likes = 0
  }
  if (!req.body.title || !req.body.url) {
    console.log('TITLE ', req.body.title, 'URL ',req.body.url)
    return res.status(400).send({ error: 'missing field \'Title\' or \'Url\'' })
  }

  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => console.error(err))
})

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true })
  res.json(updatedBlog)
})

module.exports = blogsRouter