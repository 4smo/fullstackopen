import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user, handleLike }) => {
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>{blog.likes} <button onClick={handleLike}>like</button></div>
          <div>{blog.user?.username}</div>
          {blog.user?.username === user?.username && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
      )}
    </div>
  )}

export default Blog