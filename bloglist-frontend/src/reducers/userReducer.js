const userReducer = (state=[], action) => {
  switch(action.type) {
  case 'GET_ALL_USERS':
    return action.users
  default:
    return state
  }
}

export const getAllUsers = (users) => {
  return {
    type: 'GET_ALL_USERS',
    users: users
  }
}

export default userReducer