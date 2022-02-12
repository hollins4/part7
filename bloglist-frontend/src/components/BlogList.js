import React, { useEffect } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { createNotification } from '../reducers/notificationReducer'
import { getAllBlogs, createNewBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
//import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'


const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const blogListStyle = {
    border: '2px solid black',
    margin: '5px',
    padding: '5px'
  }

  const linkTextStyle = {
    color: 'red',
    textDecoration: 'none'
  }

  const sortBlogs = (blogs) => {
    const sortedBlogs = blogs.sort(function (a, b) {
      return b.likes - a.likes
    })
    return sortedBlogs
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = sortBlogs(blogs)
      dispatch(getAllBlogs(sortedBlogs))
    })
  }, [dispatch])

  const createBlog = async (newPost) => {

    try {
      //console.log(newPost)
      const newBlog = await blogService.create(newPost)
      console.log(newBlog)
      dispatch(createNewBlog(newBlog))
      const bloglist = await blogService.getAll()
      await dispatch(getAllBlogs(sortBlogs(bloglist)))

      await dispatch(createNotification({ message: `${newPost.title}! by ${newPost.author}`, status: true }))
      await setTimeout( () => {
        dispatch(createNotification(null))
      }, 5000)

    } catch (exception) {
      dispatch(createNotification({ message: 'Missing either title, url, or author', status: false }))
      setTimeout( () => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="Create New Blog">
      <BlogForm
        createBlog={createBlog}
      />
    </Togglable>
  )

  return (
    <div>
      <br />
      { blogForm() }
      <br />
      {blogs.map(blog => {
        return (
          <ListGroup key={blog.id} style={blogListStyle}>
            <Link to={`/${blog.id}`}><ListGroup.Item variant="light" style={linkTextStyle} action>
              {blog.title} {blog.author}</ListGroup.Item></Link>
          </ListGroup>)
      }
      )}
    </div>
  )
}

export default BlogList
