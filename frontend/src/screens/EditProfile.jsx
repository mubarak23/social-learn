import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { logout, setCredentials } from '../slices/authSlice';
import { useDeleteMyAccountMutation, useUpdateUserMutation } from '../slices/usersApiSlice';

const EditProfileScreen = () => {
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [password, setPassword] = useState('')
   const [file, setFile] = useState(null)
   const [description, setDescription] = useState('')
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
    setDescription(userInfo.description)
  }, [userInfo.email, userInfo.name]);

    const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setFile(img)
  }

  const handleSelectFile = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  };

   const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
       const data = new FormData()
      data.append("my_file", file)
      const response = await axios.post("http://localhost:5000/api/upload", data);
      if (response){
        console.log(response.data)
          try {
          const res = await updateProfile({
            _id: userInfo._id,
            name,
            email,
            password,
            description,
            photo:response.data.url
          }).unwrap();
          console.log(res);
          dispatch(setCredentials(res));
          toast.success('Profile updated successfully');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
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
    <>
    <FormContainer>
      <h1>Update Profile</h1>
      {userInfo && <img src={userInfo.photo} width='100' height='100' />}
      <hr></hr>

      <Form onSubmit={submitHandler}>
        
        <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control type="file" name="file" multiple={false} onChange={handleSelectFile}/>
      </Form.Group>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
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

         <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            as="textarea"
            placeholder='Profile Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>
        <Button onClick={handleDeleteAccount} variant='primary' className='mt-3 mx-3'>
          Delete Account
        </Button>
      </Form>
    </FormContainer>
    
    </>
  )
}

export default EditProfileScreen
