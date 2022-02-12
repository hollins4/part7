import React from 'react'
import {
  Link,
} from 'react-router-dom'
import { Table } from 'react-bootstrap'


const Users = ({ users }) => {

  return(
    <div>
      <br />
      <Table striped>
        <tbody>
          <tr>
            <td>Users</td>
            <td>Blogs created</td>
          </tr>
          {users && users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users

/*
    <User
    key={user.id}
    {...user}
    />
*/
