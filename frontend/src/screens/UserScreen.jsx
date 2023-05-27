import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useFollowUserMutation, useGetUserMutation, useUnfollowUserMutation } from '../slices/usersApiSlice';
const UserScreen = () => {
  const [err, setErr] = useState(null)
  const [user, setUser] = useState()
  const [nowLoading, setNowLoading] = useState(true)
   
   const { userId } = useParams()

  const { userInfo } = useSelector((state) => state.auth);


    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        <Container>
          <Row>
          <Col xs={6} md={4}>
          <img src="https://www.svgimages.com/svg-image/s5/man-passportsize-silhouette-icon-256x256.png" />
        </Col>
        <Col xs={6} md={4}>
          <h2>{user.name}</h2>
          <hr />
           <p><span className="glyphicon glyphicon-earphone one" ></span>+91 90000 00000</p>
            <p><span className="glyphicon glyphicon-envelope one" ></span>{user.email}</p>
            <p><span className="glyphicon glyphicon-map-marker one" ></span>{user.description}</p>
            <p>Following: {user.following ? user.following.length : 0 }</p>
            <p>Followers: {user.followers ? user.followers.length : 0 }</p>
           <hr/>
           <Button variant="primary" onClick={handleFollowUser}>Follow</Button>
           <Button variant="primary" onClick={handleUnFollowUser} className=" mx-3">Unfollow</Button>
        </Col>   
        <Col xs={6} md={4} >
          <br/>
          {userInfo._id === user._id ? (
             <LinkContainer to='/edituser'>
           <Button variant="primary">Edit Profile</Button>
            </LinkContainer>
          ): 
          (
            <h3>Login to Edit</h3>
          )
          }
          
        </Col> 
          
          </Row>
        </Container>
       
      )
      }
      </>
  )
}

export default UserScreen
