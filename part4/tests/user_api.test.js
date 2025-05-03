const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const listHelper = require('../utils/list_helper')

const User = require('../models/user')

const invalidUsername = {
    username: "a",
    name: "test",
    password: "test"
}

const invalidPassword = {
    username: "testi",
    name: "testi",
    password: "a"
}

test.only('invalid username', async () => {
    await api
        .post('/api/users')
        .send(invalidUsername)
        .expect(400)
})

test('invalid password', async () => {
    await api
        .post('/api/users')
        .send(invalidPassword)
        .expect(400)
})
after(async () => {
    await mongoose.connection.close()
})