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

module.exports = blogsRouter