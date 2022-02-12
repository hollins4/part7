const loginReducer = (state=[], action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.user
  default:
    return state
  }
}

export const loginUser = (user) => {
  return {
    type: 'LOGIN',
    user: user
  }
}


export default loginReducer