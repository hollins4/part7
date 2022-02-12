import React from 'react'
import { useSelector } from 'react-redux'
import { Card, ListGroup } from 'react-bootstrap'
import {
  useParams,
} from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const users = useSelector(state => state.user)
  const user = users.find(user => user.id === id)

  if (!user) return null

  const cardSpacing = {
    marginTop: 50
  }

  return (
    <Card style={cardSpacing}>
      <Card.Header as="h5"></Card.Header>
      <Card.Title>{user.name}</Card.Title>
      <h6>Added Blogs</h6>
      <ListGroup variant="flush">
        {user.blogs.map(blog => {
          return <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        })
        }
      </ListGroup>
    </Card>
  )
}

export default User