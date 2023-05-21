import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useRegisterMutation } from '../slices/usersApiSlice';

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
   const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

   const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading}] = useRegisterMutation()

   const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);


  const submitHandler = async (e) => {
    e.preventDefault()
    console.log('We are Here at some point')
    if(password !== confirmPassword){
      toast.error('Password Did Not match')
    }else{
      try {
        const resRegister = await register({name, email, password}).unwrap()
        dispatch(setCredentials({ ...resRegister }));
        // eslint-disable-next-line no-undef
        navigate(redirect);
      } catch (err) {
         toast.error(err?.data?.message || err.error);
      }
    }
  }
  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
              <Form.Label>Name </Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
          </Form.Group>
          <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          </Form.Group>
           <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

         <Button
          
          type='submit'
          variant='primary'
          className='mt-3'
        >
          Sign up
        </Button>

       {isLoading && <Loader />}
      <Row className='py-3'>
        <Col>
          Existing Customer? <Link to='/Login'>Login</Link>
        </Col>
      </Row>

      </Form>
    </FormContainer>
  )
}

export default RegisterScreen
