const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const listHelper = require('../utils/list_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(listHelper.listWithManyBlogs)
})
  
test.only('returns correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    console.log(response.body)
    assert.strictEqual(response.body.length, listHelper.listWithManyBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})