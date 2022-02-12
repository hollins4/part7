import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const postBlog = async (event) => {
    event.preventDefault()


    const newPost = {
      title: title,
      url: url,
      author: author,
    }

    createBlog(newPost)

    setUrl('')
    setTitle('')
    setAuthor('')
  }

  return (
    <Form onSubmit={postBlog}>
      <div>
          Title:
        <Form.Control
          type="text"
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
          Author:
        <Form.Control
          type="text"
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
          Url:
        <Form.Control
          type="text"
          id="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button type="submit" id="create-blog">Create</Button>
    </Form>
  )
}


export default BlogForm