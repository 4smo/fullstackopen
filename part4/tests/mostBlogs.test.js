const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
    test('most blogs', () => {
        const result = listHelper.mostBlogs(listHelper.listWithManyBlogs)
        assert.deepStrictEqual(result, {
            author: "Robert C. Martin",
            blogs: 3
        })
      })
})