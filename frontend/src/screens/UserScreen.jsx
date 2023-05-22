import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useFollowUserMutation, useGetUserMutation } from '../slices/usersApiSlice';

const UserScreen = () => {
   const [user, setUser] = useState(null)
  const [err, setErr] = useState(null)
   
   const { userId } = useParams()

   console.log(userId)


    const dispatch = useDispatch();
    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    
    const [getUser, { isLoading }] = useGetUserMutation()

    const { users } = useSelector((state) => state.auth);
    console.log(users)
    // const singleUser = users.filter((user) => user._id !== userId )
    // console.log(singleUser)
     const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
     
    const fetchData = async () => {
          try {
            const data = await getUser({userId}).unwrap()
            console.log('Are we here')
            console.log(data)
            setUser(data)
          } catch (error) {
            console.log(error)
            setErr(error)
          }
    }
    fetchData()
     
  }, [getUser])

     const handleFollowUser = async () => {
      try {
        await useFollowUserMutation({
          
        }).unwrap()
         toast.success('Followered');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
    

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : err ? (
          <h3>{err}</h3>
      ) : (
        <Container>
        <Card>
         <Row>
          <Col xs={6} md={4}>
          <img src="https://www.svgimages.com/svg-image/s5/man-passportsize-silhouette-icon-256x256.png"  roundedCircle />
        </Col>
        <Col xs={6} md={4}>
          <h2>{userInfo.name}</h2>
          <hr />
           <p><span className="glyphicon glyphicon-earphone one" ></span>+91 90000 00000</p>
            <p><span className="glyphicon glyphicon-envelope one" ></span>{userInfo.email}</p>
            <p><span className="glyphicon glyphicon-map-marker one" ></span>{userInfo.description}</p>
           <p><span className="glyphicon glyphicon-new-window one" ></span>{userInfo.email}</p>
           <hr/>
           <Button variant="primary">Follow</Button>
           <Button variant="primary" className=" mx-3">Unfollow</Button>
        </Col>   
        <Col xs={6} md={4} >
          <br/>
           <LinkContainer to='/edituser'>
           <Button variant="primary">Edit Profile</Button>
            </LinkContainer>
        </Col> 
      </Row>
      </Card>
      </Container>
      )}
      </>
  )
}

export default UserScreen
