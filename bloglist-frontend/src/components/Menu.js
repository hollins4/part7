import React, { useEffect } from 'react'
import BlogList from './BlogList'
import Blog from './Blog'
import Users from './Users'
import User from './User'
import { Button } from 'react-bootstrap'
import userServices from '../services/user'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import { getAllUsers } from '../reducers/userReducer'


const Menu = ({ user, handleLogout }) => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.user)

  const menuBackGround = {
    backgroundColor: 'lightgrey',
    border: '1px solid black',
    padding: 10
  }

  const padding = { padding: 5 }

  useEffect( async () => {
    const usersList = await userServices.getAllUsers()
    await dispatch(getAllUsers(usersList))
  }, [])


  return(
    <div>
      <div style={menuBackGround}>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/users">Users</Link>
        <span>{user.name} is logged in </span>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users users={users}/>
        </Route>
        <Route path="/:id">
          <Blog user={user}/>
        </Route>
        <Route path="/">
          <BlogList user={user} />
        </Route>
      </Switch>
    </div>
  )
}

export default Menu