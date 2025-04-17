const _ = require('lodash')

const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const blog = blogs.reduce((max, blog) => {
    return blog.likes > max.likes ? blog : max
  }, blogs[0])
  const { __v, ...blogWithoutVersion } = blog
  return blogWithoutVersion
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authorBlogs = _.groupBy(blogs, 'author')
  const authorWithMostBlogs = _.maxBy(Object.keys(authorBlogs), (author) => authorBlogs[author].length)
  return {
    author: authorWithMostBlogs,
    blogs: authorBlogs[authorWithMostBlogs].length
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const authorLikes = _.groupBy(blogs, 'author')
  const authorWithMostLikes = _.maxBy(Object.keys(authorLikes), (author) => {
    return authorLikes[author].reduce((sum, blog) => sum + blog.likes, 0)
  })
  return {
    author: authorWithMostLikes,
    likes: authorLikes[authorWithMostLikes].reduce((sum, blog) => sum + blog.likes, 0)
  }
}

module.exports = {
  totalLikes,
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  listWithManyBlogs
}