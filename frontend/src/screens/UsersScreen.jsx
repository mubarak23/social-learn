
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import { setUsers } from '../slices/authSlice';
import { useAllUsersMutation } from '../slices/usersApiSlice';

const UsersScreen = () => {
  const [users, setUser] = useState([])
  const [error, setError] = useState('')
  
  const dispatch = useDispatch()

  const [allUsers, { isLoading}] = useAllUsersMutation()
  

    useEffect(() => {
    const fetchData = async () => {
          try {
             const data = await allUsers().unwrap()
             dispatch(setUsers({...data}))
            console.log(data)
            setUser(data)
          } catch (error) {
            console.log(error)
            setError(error)
          }
    }
    fetchData()
  }, [allUsers])

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
          <h3>{error}</h3>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
             
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                 <LinkContainer to={`/user/${user._id}`}><td>View Profile</td></LinkContainer>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );

}

export default UsersScreen

// {`/user/${user._id}`}
// <td><LinkContainer to='/users'>View Profile {user.name} </LinkContainer></td>
//  <th>Action</th>