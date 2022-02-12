

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'GET_ALL':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'UPDATE_LIKE': {
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  }
  case 'UPDATE_COMMENT':
    return state.map(blog => blog.id !== action.data.id ? blog : action.data )
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  default:
    return state
  }
}

export const getAllBlogs = (content) => {
  return {
    type: 'GET_ALL',
    data: content
  }
}

export const createNewBlog = (content) => {
  return {
    type: 'NEW_BLOG',
    data: content
  }
}

export const updateBlogLikesReducer = (blog) => {
  return {
    type: 'UPDATE_LIKE',
    data: blog
  }
}

export const updateBlogCommentReducer = (blog) => {
  return {
    type: 'UPDATE_COMMENT',
    data: blog
  }
}

export const deleteBlogReducer = (id) => {
  return {
    type: 'DELETE_BLOG',
    id: id
  }
}

export default blogReducer