const { test, describe } = require('node:test')
const assert = require('node:assert')

const mostLikes = require('../utils/list_helper').mostLikes

describe('more liked blog', () => {
  const blogs = [
    { title: 'Test-Blog1', author: 'Moro Dupas', url: 'https://samepath', likes: 52, posts: [
      { post: 'something', likes: 45 },
      { post: 'something', likes: 10 },
      { post: 'something', likes: 16 },
      { post: 'something', likes: 7 },
      { post: 'something', likes: 54 },
    ] },
    { title: 'Test-Blog2', author: 'Sutar Nakos', url: 'https://samepath', likes: 23, posts: [
      { post: 'something', likes: 48 },
      { post: 'something', likes: 11 },
      { post: 'something', likes: 29 },
      { post: 'something', likes: 61 },
      { post: 'something', likes: 77 },
      { post: 'something', likes: 3 },
    ] },
    { title: 'Test-Blog3', author: 'Petro Phihalo', url: 'https://samepath', likes: 67, posts: [
      { post: 'something', likes: 107 },
      { post: 'something', likes: 34 },
    ] },
    { title: 'Test-Blog4', author: 'Otto Minda', url: 'https://samepath', likes: 106, posts: [
      { post: 'something', likes: 125 },
      { post: 'something', likes: 38 },
      { post: 'something', likes: 96 },
      { post: 'something', likes: 40 },
    ] },
    { title: 'Test-Blog5', author: 'Sanio Fugani', url: 'https://samepath', likes: 88, posts: [
      { post: 'something', likes: 5 },
      { post: 'something', likes: 44 },
      { post: 'something', likes: 2 },
      { post: 'something', likes: 17 },
      { post: 'something', likes: 32 },
      { post: 'something', likes: 7 },
      { post: 'something', likes: 1 },
      { post: 'something', likes: 0 },
      { post: 'something', likes: 16 },
      { post: 'something', likes: 12 },
      { post: 'something', likes: 10 },
    ] },
  ]

  test('when blogs have many users', () => {
    const result = mostLikes(blogs)

    return assert(result, 125)
  })
})