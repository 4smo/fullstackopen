import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        addBlog(state, action) {
            return state.concat(action.payload)
        },
        vote(state, action) {
            const id = action.payload
            const toVote = state.find(s => s.id === id)
            const voted = { ...toVote, likes: toVote.likes + 1 }
            return state.map(s => s.id === voted.id ? voted : s)
        },
        replaceBlog(state, action) {
            const replaced = action.payload
            return state.map(s => s.id === replaced.id ? replaced : s)
        },
        removeBlog(state, action) {
            return state.filter(blog => blog.id !== action.payload)
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (object) => {
    return async dispatch => {
        const blog = await blogService.create(object)
        dispatch(addBlog(blog))
    }
}

export const voteBlog = (blog) => {
    return async dispatch => {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        const returnedBlog = await blogService.update(blog.id, updatedBlog)
        dispatch(replaceBlog(returnedBlog))
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(removeBlog(id))
    }
}

export const { setBlogs, addBlog, replaceBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer
