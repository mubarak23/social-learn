import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useFollowUserMutation, useGetUserMutation, useUnfollowUserMutation } from '../slices/usersApiSlice';
const UserScreen = () => {
  const [err, setErr] = useState(null)
  const [user, setUser] = useState()
  const [nowLoading, setNowLoading] = useState(true)

  const [showOldPosts, setShowOldPosts] = useState(false);
   
  const handleShowOldPosts = () => {
    setShowOldPosts(true);
  };
   
   const { userId } = useParams()

  const { userInfo } = useSelector((state) => state.auth);


  

    // eslint-disable-next-line no-unused-vars
    
    const [getUser, { isLoading }] = useGetUserMutation(userId)
     const [followUser] = useFollowUserMutation();
     const [unfollowUser] = useUnfollowUserMutation()

    useEffect(() => {
    const fetchData = async () => {
          try {
            const data = await getUser(userId).unwrap()
            console.log(data)
            setUser(data)
            setNowLoading(false)
          } catch (error) {
            console.log(error)
            setErr(error)
          }
    }
  fetchData()
     
  }, [])

     const handleFollowUser = async () => {
       
      try {
        const body = {
          followId: user._id
        }
        await followUser(body).unwrap()
         toast.success('Followered');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }

     const handleUnFollowUser = async () => {
      try {
        const body = {
          followId: user._id
        }
        await unfollowUser(body).unwrap()
         toast.success('Unfollowered');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
   


  return (
    <>
    <h2>Welcome Home</h2>
    {nowLoading ? (
        <Loader />
      ) : err ? (
          <h3>{err}</h3>
      ) : (
        <Container >
          <Row className='justify-content-center mt-5'>
            <Col md={6} xs={6}>
            <Card.Img variant="top" src={user.photo} height='300' width='250' alt="Profile" />
          </Col>
           <Col md={6} xs={6}>
          <Card>
            <Card.Body>
              <Card.Title>User Profile</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {user.name}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> { user.email}
              </Card.Text>
              <Card.Text>
                <strong>Bio:</strong> { user.description}
              </Card.Text>
              <Card.Text>
                <strong>Following</strong> {user.following ? user.following.length : 0 }
              </Card.Text>
              <Card.Text>
                <strong>Followers:</strong> {user.followers ? user.followers.length : 0 }
              </Card.Text>
              <Button variant="primary" onClick={handleFollowUser}>Follow</Button>
           <Button variant="primary" onClick={handleUnFollowUser} className=" mx-3">Unfollow</Button>
              {showOldPosts ? (
                <div>
                  <h4>Old Posts:</h4>
                  <ul>
                    <li>Post 1</li>
                    <li>Post 2</li>
                    <li>Post 3</li>
                  </ul>
                </div>
              ) : (
                <Button variant="primary" onClick={handleShowOldPosts}>
                  Show Old Posts
                </Button>
              )}
              <br/>
              {userInfo._id === user._id ? (
                <LinkContainer to='/edituser'>
              <Button variant="primary" className=" mt-2">Edit Profile</Button>
                </LinkContainer>
              ): 
              (
                <h4>Login to Edit</h4>
              )
              }
            </Card.Body>
          </Card>
          </Col>
          </Row>
        </Container>
       
      )
      }
      </>
  )
}

export default UserScreen
