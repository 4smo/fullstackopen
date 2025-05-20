import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotificationWithTimeout(`you created anecdote '${content}'`))
  }
  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
    </form>
    </div>
  )
}

export default AnecdoteForm