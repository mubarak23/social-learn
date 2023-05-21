

import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Loader from '../components/Loader';
import { useAllUsersMutation } from '../slices/usersApiSlice';

const UsersScreen = () => {
  const [users, setUser] = useState([])
  const [error, setError] = useState('')

  const [allUsers, { isLoading}] = useAllUsersMutation()

    useEffect(() => {
    const fetchData = async () => {
          try {
             const data = await allUsers().unwrap()
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
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );

}

export default UsersScreen
