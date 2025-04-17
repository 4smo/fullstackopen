const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {
    test('most likes', () => {
        const result = listHelper.mostLikes(listHelper.listWithManyBlogs)
        assert.deepStrictEqual(result, {
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})