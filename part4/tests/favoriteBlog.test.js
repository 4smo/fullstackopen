const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
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
})