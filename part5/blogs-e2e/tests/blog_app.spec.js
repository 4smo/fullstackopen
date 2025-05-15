const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, logOut } = require('./helper')
const { create } = require('domain')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test',
        username: 'Test',
        password: '123456'
      }
    })

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'user2',
        username: 'user2',
        password: '123456'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'log in'}).click()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'Test', '123456')
      await expect(page.getByText('Test logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'Test', 'wrongpass')
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('wrong credentials')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'Test', '123456')
      await createBlog(page, 'title test', 'author test', 'url test')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test Title', 'Test Author', 'Test Url')
      await expect(page.getByText('a new blog Test Title by Test')).toBeVisible()
      await expect(page.getByText('Test Title Test Author')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('1')).toBeVisible
    })

    test('only the blog creator can see delete button', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'delete'})).toBeVisible()

      await logOut(page)
      await page.getByRole('button', { name: 'cancel' }).click()
      await loginWith(page, 'user2', '123456')

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'delete'})).not.toBeVisible()
    })

    test('the blog creator can delete the blog', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'delete' }).click()
      await expect(page.getByText('title test author test')).not.toBeVisible()
    })

    test('blogs are ranked based on likes', async ({ page }) => {
      await createBlog(page, 'no likes blog', 'test author', 'www.0.com')
      await createBlog(page, '2 likes blog', 'test author', 'www.2.com')
      await createBlog(page, '1 likes blog', 'test author', 'www.1.com')

      for (let i = 0; i < 4; i++) {
        await page.getByRole('button', { name: 'view' }).first().click()
      }

      const likeButtons = await page.getByRole('button', { name: 'like' }).all()
      await likeButtons[2].click()
      await likeButtons[2].click()
      await likeButtons[3].click()
      
      const blogs = await page.locator('div[style*="padding-top: 10px"]').all()
      await expect(blogs[0]).toContainText('2 likes blog')
      await expect(blogs[1]).toContainText('1 likes blog')
    })
  })
})