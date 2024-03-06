const { test, describe } = require('node:test')
const assert = require('node:assert')

const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('likest', () => {
  const blogs = [
    { title: 'Test-Blog1', author: 'Moro Dupas', url: 'https://samepath', likes: 52 },
    { title: 'Test-Blog2', author: 'Sutar Nakos', url: 'https://samepath', likes: 23 },
    { title: 'Test-Blog3', author: 'Petro Phihalo', url: 'https://samepath', likes: 67 },
    { title: 'Test-Blog4', author: 'Otto Minda', url: 'https://samepath', likes: 106 },
    { title: 'Test-Blog5', author: 'Sanio Fugani', url: 'https://samepath', likes: 88 },
  ]

  test('blogs list has many blogs', () => {
    const result = favoriteBlog(blogs)

    return assert(result.likes, 106)
  })
})