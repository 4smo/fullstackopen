import { useSelector, useDispatch } from 'react-redux'
import { voteBlog } from '../reducers/blogReducer' 
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'

const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const user = useSelector(state => state.user)
    const byVotes = (a1, a2) => a2.likes - a1.likes
    const sortedBlogs = [...blogs].sort(byVotes)

    const handleVote = (blog) => {
        dispatch(voteBlog(blog))
    }

    return (
        <div>
            {sortedBlogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={() => handleVote(blog)}
                    user={user}
                />
            )}
        </div>
    )
}

export default BlogList