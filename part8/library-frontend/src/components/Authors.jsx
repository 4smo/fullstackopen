import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [setBornTo, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }
  
  if (result.loading)  {
    return <div>loading...</div>
  }
  
  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: parseInt(setBornTo) } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    <h2>Set birthyear</h2>
    <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Set birthyear</button>
      </form>
    </div>
  )
}

export default Authors
