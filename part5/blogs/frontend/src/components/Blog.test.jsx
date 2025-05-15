import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from './Blog'
import BlogForm from './BlogForm'

const blog = {
    id: "5a43fde2cbd20b12a2c34e91",
    title: "Example Title",
    author: "Example Author",
    url: "www.example.com",
    likes: 9,
    user: {
        username: "testuser",
        name: "Test User"
    }
}

test('Title renders', () => {
    render(<Blog blog={blog} />)
    const element = screen.getByText('Example Title Example Author')
})

test('Clicking show displays all info', async () => {
    render(<Blog blog={blog} />)
    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)

    screen.getByText(blog.url)
    screen.getByText(blog.likes)
})

test('clicking like button twice calls event handler twice', async () => {
    const mockHandler = vi.fn()
    render(<Blog blog={blog} handleLike={mockHandler} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

test('blog form calls createBlog with correct data when submitted', async () => {
    const createBlog = vi.fn()
    render(<BlogForm createBlog={createBlog} />)

    const user = userEvent.setup()

    const inputs = screen.getAllByRole('textbox')
    const titleInput = inputs[0]
    const authorInput = inputs[1]
    const urlInput = inputs[2]

    await user.type(titleInput, 'Test Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'http://test.com')

    const createButton = screen.getByText('create')
    await user.click(createButton)

    expect(createBlog.mock.calls[0][0]).toEqual({
        title: 'Test Title',
        author: 'Test Author',
        url: 'http://test.com'
    })
})