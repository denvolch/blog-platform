const { test, describe } = require('node:test')
const assert = require('node:assert')

const mostBlogs = require('../utils/list_helper').mostBlogs

describe('author which has most blogs', () => {
  const blogs = [
    { title: 'Test-Blog1', author: 'Moro Dupas', url: 'https://samepath', likes: 52, posts: [1,2,3,4,5,6,7,8,9] },
    { title: 'Test-Blog2', author: 'Sutar Nakos', url: 'https://samepath', likes: 23, posts: [1,2,3,4,5,6,7,8,9,10,11] },
    { title: 'Test-Blog3', author: 'Petro Phihalo', url: 'https://samepath', likes: 67, posts: [1,2,3,4,5,6,7] },
    { title: 'Test-Blog4', author: 'Otto Minda', url: 'https://samepath', likes: 106, posts: [1,2,3] },
    { title: 'Test-Blog5', author: 'Sanio Fugani', url: 'https://samepath', likes: 88, posts: [1,2,3,4,5,6,7,8,9,10,11,12,13] },
  ]

  test('when blogs list consists many blogs', () => {
    const result = mostBlogs(blogs)

    return assert(result, 13)
  })
})