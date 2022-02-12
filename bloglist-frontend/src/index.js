import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogReducer,
  login: loginReducer,
  user: userReducer
})

const store = createStore(reducer)


ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
)