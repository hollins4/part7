import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`

}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getBlog = async id => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, Object) => {

  const response = await axios.put(`${baseUrl}/${id}`, Object)
  return response.data
}

const updateComment = async (id, Object) => {
  console.log(Object)
  const response = await axios.put(`${baseUrl}/${id}`, Object)
  console.log(response.data)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


export default { getAll, getBlog, setToken, create, update, deleteBlog, updateComment }