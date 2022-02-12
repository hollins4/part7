import React  from 'react'
import './blogstyle.css'
import { useDispatch, useSelector } from 'react-redux'
import { Card, ListGroup, Button, Form } from 'react-bootstrap'
import { updateBlogLikesReducer, deleteBlogReducer, updateBlogCommentReducer } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { createNotification } from '../reducers/notificationReducer'
import {
  useParams,
  Redirect
} from 'react-router-dom'


const Blog = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id

  const blog = blogs.find(blog => blog.id === id)

  if(!user || !blog) return <Redirect to="/" />

  const own = blog.user.username === user.username

  const cardSpacing = {
    marginTop: 100
  }

  const likeButtonSpacing = {
    marginLeft: 10
  }

  const commentButtonSpacing = {
    marginTop: 10
  }


  const deleteBlog = async (id) => {
    try {

      const blogToDelete = blogs.find(blog => blog.id === id)

      let confirm = window.confirm(`Are you sure you want to delete ${blogToDelete.title}? `)

      if (!confirm)
        return

      await dispatch(deleteBlogReducer(blogToDelete.id))
      await blogService.deleteBlog(id)
      await blogService.getAll()

      await dispatch(createNotification({ message: `${blogToDelete.title} has been deleted`, status: true }))
      await setTimeout( () => {
        dispatch(createNotification(null))
      }, 5000)

    } catch (error) {
      dispatch(createNotification({ message: `${error}`, status: false }))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  const updateBlogLikes = async (id) => {
    try {
      const post = blogs.find(blog => blog.id === id)
      let likesPlusOne = post.likes + 1
      const updatedBlogLikes = { ...post, likes: likesPlusOne }

      await dispatch(updateBlogLikesReducer(updatedBlogLikes))
      await blogService.update(id, updatedBlogLikes)
      await blogService.getAll()

    } catch (error) {
      dispatch(createNotification({ message: 'Blog was already removed from server', status: false }))
      setTimeout(() => {
        dispatch(createNotification(null))
      }, 5000)
    }
  }

  const addComment = async (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    const updatedBlog = { ...blog, comments: blog.comments.concat(content) }
    await blogService.updateComment(id, updatedBlog )
    await dispatch(updateBlogCommentReducer(updatedBlog))
  }


  return(
    <Card style={cardSpacing} >
      <Card.Header as="h5"></Card.Header>
      <Card.Body>
        <Card.Title>{blog.title} {blog.author}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item variant="flush"><a href={`http://${blog.url}`}>{blog.url}</a></ListGroup.Item>
          <ListGroup.Item variant="flush"> Likes: <span className='totalLikes' variant="primary">{blog.likes}</span>
            <Button variant="success" style={likeButtonSpacing} onClick={() => updateBlogLikes(blog.id)}>Like</Button></ListGroup.Item>
          <ListGroup.Item>added by {user.name}</ListGroup.Item>
          {own && <Button className="w-25" onClick={() => deleteBlog(blog.id)}>Delete</Button>}
        </ListGroup>
        <div>
          <Card.Title>Comments</Card.Title>
          <Form onSubmit={addComment}>
            <Form.Control type="text" name="comment" className="w-25" />
            <Button variant="info" style={commentButtonSpacing}>Add Comments</Button>
          </Form>
          <ul>
            {blog.comments && blog.comments.map((comment, index) => {
              return <li key={index}>{comment}</li>
            })}
          </ul>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Blog
