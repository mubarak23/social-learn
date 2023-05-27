import { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../slices/authSlice';
import { useDeleteMyAccountMutation, useFollowUserMutation } from '../slices/usersApiSlice';

const ProfileScreen = () => {
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
     const navigate = useNavigate();

   
    const { userInfo } = useSelector((state) => state.auth);

    console.log(userInfo)

   //  const [updateProfile, { isLoading }] = useUpdateUserMutation();
    const [deleteMyAccount] = useDeleteMyAccountMutation();
    
  

   const handleDeleteAccount = async () => {
      try {
        await deleteMyAccount().unwrap()
        dispatch(logout())
         toast.success('Account Deleted Successfully');
        navigate('/register')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }

     const handleFollowUser = async () => {
      try {
        await useFollowUserMutation({
          
        }).unwrap()
         toast.success('Account Deleted Successfully');
        navigate('/register')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
    

  return (
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
           <p>Following: {userInfo.following ? userInfo.following.length: 0 }</p>
           <p>Followers: {userInfo.followers ? userInfo.followers.length: 0 }</p>
         
        </Col>   
        <Col xs={6} md={4} >
          <br/>
           <LinkContainer to='/edituser'>
           <Button variant="primary">Edit Profile</Button>
            </LinkContainer>
          <Button variant="primary" onClick={handleDeleteAccount} className=" mx-3">Delete Account</Button> 
        </Col> 
      </Row>
      </Card>
    </Container>
  )
}

export default ProfileScreen
