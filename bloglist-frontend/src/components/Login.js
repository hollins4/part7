import React, { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { createNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loginReducer'


const Login = ({ user }) => {

  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    if (user === null) return

    try {
      const user = await loginService.login({
        username, password,
      })
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'user',  JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(loginUser(user))

    } catch (exception) {

      dispatch(createNotification({ message: 'Wrong credentials', status: false }))
      setUsername('')
      setPassword('')
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            input="text"
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            input="text"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">Login</button>
      </form>
    </div>
  )
}

export default Login

