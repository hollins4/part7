import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notifications'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from './reducers/loginReducer'
import Menu from './components/Menu'
import Login from './components/Login'



const App = () => {
  const dispatch = useDispatch()
  const errorMessage = useSelector(state => state.notifications).pop()
  const user = useSelector(state => state.login)

  useEffect(() => {
    let loggedInUser = window.localStorage.getItem('user')

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      dispatch(loginUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    dispatch(loginUser([]))
    blogService.setToken(null)
  }


  if (user.length === 0) {
    return (
      <div>
        <h2>Log into Application</h2>
        <br />
        <Login user={user} />
      </div>
    )
  }

  console.log(user)

  return (
    <div className="container">
      <h2>Blogs</h2>
      <Notification info={errorMessage}/>
      <div>

      </div>
      <Menu
        user={user}
        handleLogout={handleLogout}
      />
    </div>
  )
}

export default App
