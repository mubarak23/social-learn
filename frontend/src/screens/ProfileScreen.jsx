import { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout, setCredentials } from '../slices/authSlice';
import { useDeleteMyAccountMutation, useUpdateUserMutation } from '../slices/usersApiSlice';

const ProfileScreen = () => {
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
     const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    // eslint-disable-next-line no-unused-vars
    const [updateProfile, { isLoading }] = useUpdateUserMutation();
    const [deleteMyAccount] = useDeleteMyAccountMutation();
    
    useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

   const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

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
           <Button variant="primary">Follow</Button>
           <Button variant="primary" className=" mx-3">Unfollow</Button>
        </Col>   
        <Col xs={6} md={4} >
          <br/>
           <LinkContainer to='/edituser'>
           <Button variant="primary">Edit Profile</Button>
            </LinkContainer>
          <Button variant="primary" className=" mx-3">Delete Account</Button> 
        </Col> 
      </Row>
      </Card>
    </Container>
    //{/* // <>
    // <div className='container'>
    //     <div className='jumbotron'>
    //         <div className='row'>
    //               <div className='col-md-4 col-xs-12 col-sm-6 col-lg-4'>
    //                  <img src="https://www.svgimages.com/svg-image/s5/man-passportsize-silhouette-icon-256x256.png" alt="stack photo" class="img" />
    //               </div>
    //               <div className='col-md-8 col-xs-12 col-sm-6 col-lg-8'>
    //                    <div className="container">
    //                         <h2>{userInfo.name}</h2>
    //                     </div>
    //                     <hr />
                        
    //                         <p><span className="glyphicon glyphicon-earphone one" ></span>+91 90000 00000</p>
    //                         <p><span className="glyphicon glyphicon-envelope one" ></span>{userInfo.email}</p>
    //                         <p><span className="glyphicon glyphicon-map-marker one" ></span>{userInfo.description}</p>
    //                         <p><span className="glyphicon glyphicon-new-window one" ></span>{userInfo.email}</p>
                        
    //               </div>
    //         </div>
    //     </div>
    // </div>
    // </> */}
  )
}

export default ProfileScreen
