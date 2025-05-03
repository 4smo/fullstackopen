const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const listHelper = require('../utils/list_helper')

const Blog = require('../models/blog')

const newBlog = {
    title: "testi",
    author: "testi",
    url: "https://i.com",
    likes: 100
}

const blogWithoutLikes = {
    title: "testi",
    author: "testi",
    url: "https://i.com"
}

const blogWithoutTitle = {
    author: "testi",
    url: "https://i.com",
    likes: 100
}

const blogWithoutUrl = {
    title: "testi",
    author: "testi",
    likes: 100
}

const updateBlog = {
    title: "updated title",
    author: "updated Author",
    url: "https://updated.com",
    likes: 1000
}

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(listHelper.listWithManyBlogs)
})

test('post blog', async () => {
    await api.post('/api/blogs').send(newBlog)
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, listHelper.listWithManyBlogs.length + 1)
})

test('id check', async () => {
    const response = await api.get('/api/blogs')
    const result = listHelper.idCheck(response.body)
    assert.strictEqual(result, true)
})

test('returns correct number of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, listHelper.listWithManyBlogs.length)
})

test('posting blog without likes becomes 0', async () => {
    await api.post('/api/blogs').send(blogWithoutLikes)
    const response = await api.get('/api/blogs')
    const postedBlog = response.body.find(blog => blog.title === blogWithoutLikes.title)
    assert.strictEqual(postedBlog.likes, 0)
})

test('posting blog without title or url returns 400', async () => {
    await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
    await api.post('/api/blogs').send(blogWithoutUrl).expect(400)
})

test('delete blog', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    await api.delete(`/api/blogs/${blog.id}`)
    const response2 = await api.get('/api/blogs')
    assert.strictEqual(response2.body.length, listHelper.listWithManyBlogs.length - 1)
})

test('update blog', async () => {
    const response = await api.get('/api/blogs')
    const blogToUpdate = response.body[0]

    const response2 = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updateBlog)
    const updatedBlog = response2.body

    assert.strictEqual(response2.body.likes, updatedBlog.likes)
})

after(async () => {
    await mongoose.connection.close()
})