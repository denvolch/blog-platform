const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest =require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)


beforeEach(async () => {
  const initialBlog =[
    {
      title: 'Title',
      author: 'Dummy Dumms',
      url: 'https://samepath',
      likes: 44,
    },
  ]

  await Blog.deleteMany({})

  const blogs = initialBlog.map(blog => new Blog(blog))
  const promArr = blogs.map(blog => blog.save())

  await Promise.all(promArr)
})

after(() => mongoose.connection.close())

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('returned objects contains a field named \'id\'', async () => {
  const testStr = 'id'

  const rawData = await api.get('/api/blogs')
  const blogs = await JSON.parse(rawData.res.text)

  blogs.forEach(blog => {
    assert(Object.keys(blog).includes(testStr))
  })
})

test('create new blog', async () => {
  const newBlog = {
    title: 'New Test BlogTitle',
    author: 'Tester Testering',
    url: 'https://test.test',
    likes: 100
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await Blog.find({})
  assert.strictEqual(blogs.length, 2)
})

test('if filed \'likes\' not exist then it getting 0', async () => {
  const newBlog = {
    title: 'New Test BlogTitle',
    author: 'Tester Testering',
    url: 'https://test.test',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect('Content-Type', /application\/json/)
    .expect(201)
    .expect(res => {
      // console.log(res._body)
      assert.strictEqual(res._body.likes, 0)
    })

  const blogs = await Blog.find({})
  assert.strictEqual(blogs.length, 2)
})

test('missing fileds \'title\' & \'url\' returns code 400 \'Bad Request\'', async () => {
  const newBlog = {
    title: '',
    author: 'Tester Testering',
    url: '',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect(res => {
      assert.strictEqual(res.res.statusMessage, 'Bad Request')
      assert.strictEqual(res._body.error, 'missing field \'Title\' or \'Url\'')
    })

  const blogs = await Blog.find({})
  assert.strictEqual(blogs.length, 1)
})

describe('deletion of blog post', () => {
  test('successed when \'id\' is valid and returned code 204', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete =  blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })
})

describe.only('updating of blog', () => {
  test.only('when update title property', async () => {
    const blogAtStart = await Blog.find({})

    const updateTitle = {
      title: 'Updated title'
    }

    await api
      .put(`/api/blogs/${blogAtStart[0]._id}`)
      .send(updateTitle)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect(res => assert.strictEqual(res._body.title, 'Updated title'))
  })
})
