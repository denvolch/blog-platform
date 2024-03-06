const dummy = blogs => {
  console.log(blogs.length)
  return 1
}

const totalLikes = blogs => {
  const likes= blogs.map(blog => blog.likes)
  return likes.reduce((total, like) => total + like, 0)
}

const favoriteBlog = blogs => {
  let maxLikes, id

  blogs.forEach(blog => {
    if (!maxLikes || maxLikes < blog.likes) {
      id = blog._id
      maxLikes = blog.likes
    }
  })

  const favorite = blogs.find(blog => blog._id === id)

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = blogs => {
  let blogCounter, id

  blogs.forEach(blog => {
    if (!blogCounter || blogCounter < blog.posts.length) {
      id = blog._id
      blogCounter = blog.likes
    }
  })

  const topBlogger = blogs.find(blog => blog._id === id)

  return {
    author: topBlogger.author,
    blogs: blogCounter
  }
}

const mostLikes = blogs => {
  let likesCounter, id

  blogs.forEach(blog => {
    blog.posts.forEach(post => {
      if (!likesCounter || likesCounter < post.likes) {
        id = blog._id
        likesCounter = blog.likes
      }
    })
  })

  const topBlogger = blogs.find(blog => blog._id === id)

  return {
    authore: topBlogger.author,
    likes: likesCounter
  }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}