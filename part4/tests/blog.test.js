const { test } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

test('when list has only one blog equals the likes of that', () => {
  const result = listHelper.totalLikes(listHelper.listWithOneBlog)
  assert.strictEqual(result, 5)
})

test('total likes of many blogs', () => {
  const result = listHelper.totalLikes(listHelper.listWithManyBlogs)
  assert.strictEqual(result, 36)
})

test('favorite blog', () => {
  const result = listHelper.favoriteBlog(listHelper.listWithManyBlogs)
  assert.deepStrictEqual(result, {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  })
})

test('most blogs', () => {
  const result = listHelper.mostBlogs(listHelper.listWithManyBlogs)
  assert.deepStrictEqual(result, {
    author: "Robert C. Martin",
    blogs: 3
  })
})

test('most likes', () => {
  const result = listHelper.mostLikes(listHelper.listWithManyBlogs)
  assert.deepStrictEqual(result, {
    author: "Edsger W. Dijkstra",
    likes: 17
  })
}) 