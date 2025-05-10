const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const listHelper = require('../utils/list_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

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
    await User.deleteMany({})

    const saltRounds = 2
    const password = '123456'
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
            username: "test",
            name: "test",
            passwordHash
    })
    await user.save()

    const response = await api
        .post('/api/login')
        .send({
            username: 'test',
            password: '123456'
        })

    token = response.body.token

    await Blog.insertMany(listHelper.listWithManyBlogs)
})

test('post blog', async () => {
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
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
    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogWithoutLikes)
    const response = await api.get('/api/blogs')
    const postedBlog = response.body.find(blog => blog.title === blogWithoutLikes.title)
    assert.strictEqual(postedBlog.likes, 0)
})

test('posting blog without title or url returns 400', async () => {
    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogWithoutTitle)

    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogWithoutUrl)
})

test('delete blog', async () => {
    const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)

    const blogToDelete = response.body

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)

    const response2 = await api.get('/api/blogs')

    assert.strictEqual(response2.body.length, listHelper.listWithManyBlogs.length)
})

test('update blog', async () => {
    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)

    const blogToUpdate = response.body

    const response2 = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updateBlog)
    const updatedBlog = response2.body

    assert.strictEqual(response2.body.likes, updatedBlog.likes)
})

test('post blog unauthorized', async () => {
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})

after(async () => {
    await mongoose.connection.close()
})