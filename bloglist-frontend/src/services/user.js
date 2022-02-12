import axios from 'axios'
const baseURL = '/api/users'

const getAllUsers = async () => {
  const request = await axios.get(baseURL)
  return request.data
}

export default { getAllUsers }