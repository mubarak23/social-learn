import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import { useFindPeopleMutation } from '../slices/usersApiSlice';

const ProfileScreen = () => {
  const [peoples, setPeople] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [err, setErr] = useState(null)
  const [findPeople ] = useFindPeopleMutation()

   
    const { userInfo } = useSelector((state) => state.auth);

   useEffect(() => {
    const fetchData = async () => {
          try {
            const data = await findPeople().unwrap()
            console.log(data)
            setPeople(data)
            setIsLoading(false)
          } catch (error) {
            console.log(error)
            setErr(error)
          }
    }
  fetchData()
     
  }, [])

   
    


  return (
    <Container >
          <Row className='justify-content-center mt-5'>
            <Col md={4} xs={6}>
            <Card.Img variant="top" src={userInfo.photo} height='300' width='250' alt="Profile" />
          </Col>
           <Col md={4} xs={6}>
          <Card>
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {userInfo.name}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> { userInfo.email}
              </Card.Text>
              <Card.Text>
                <strong>Bio:</strong> { userInfo.description}
              </Card.Text>
              <Card.Text>
                <strong>Following</strong> {userInfo.following ? userInfo.following.length : 0 }
              </Card.Text>
              <Card.Text>
                <strong>Followers:</strong> {userInfo.followers ? userInfo.followers.length : 0 }
              </Card.Text>
              
              <br/>
              
                <LinkContainer to='/edituser'>
              <Button variant="primary" className=" mt-2">Edit Profile</Button>
                </LinkContainer>
             
            </Card.Body>
          </Card>
          </Col>
          <Col md={4} xs={6}>
            <h2>People to Follow</h2>
            {isLoading ? (
            <Loader />
          ) : err ? (
              <h3>{err}</h3>
          ) : (
            <div>
          <ListGroup>
            { peoples.filter((user)=> user._id !== userInfo._id).map(person => (
              
              <ListGroup.Item key={person._id}>
                 <Card.Img variant="top"src={person.photo} alt={person.name} roundedCircle width={40} height={40} />
                  <LinkContainer to={`/profile/${person._id}`}><h5>{person.name}</h5></LinkContainer>
                <Button className='btn btn-primary'>Follow</Button>
              </ListGroup.Item>
            ))}
           
          </ListGroup>
        </div>
          ) }
          </Col>
          </Row>
        </Container>
  )
}

export default ProfileScreen
