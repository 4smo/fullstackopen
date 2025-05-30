import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../queries'

const Login = ({ show, setToken }) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [ loginUser, result ] = useMutation(LOGIN_USER)

    if (!show) {
        return null
    }

    useEffect(() => {
        if ( result.data ) {
          const token = result.data.login.value
          setToken(token)
          localStorage.setItem('user-token', token)
        }
      }, [result.data])

    const submit = async (event) => {
        event.preventDefault()
        loginUser({ variables: { username: name, password } })
        setName('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    name 
                    <input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                password
                <input
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login