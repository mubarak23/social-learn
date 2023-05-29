
import axios from 'axios';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreatePostMutation } from '../../slices/postsApiSlice';

const PostForm = () => {
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState();
  const [file, setFile] = useState(null);

    const navigate = useNavigate()

  const [ createPost, {isLoading} ] = useCreatePostMutation()

   const handleSelectFile = async (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  };


   const submitHandler = async (e) => {
    e.preventDefault()
    if(file){
       const data = new FormData()
      data.append("my_file", file)
      const response = await axios.post("http://localhost:5050/api/upload", data);
        console.log(response.data.url);
        toast.success('Post Image uploaded successfully')
        setPhoto(response.data.url);
        console.log(response.data);
      if(response){
        try {
        console.log(photo)
        console.log(response.data.url)
        console.log(content)
        await createPost({content, photo }).unwrap()
        // eslint-disable-next-line no-undef
        toast.success('Post Created Successfully')
        navigate('/posts');
      } catch (err) {
         toast.error(err?.data?.message || err.error);
      }
    }
  }
 
}
  

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <Form className='my-1' onSubmit={submitHandler}>
        <Form.Group>
          <Form.Control
            as='textarea'
            name='text'
            rows={5}
            placeholder='Create a post'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
         <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Post Image</Form.Label>
        <Form.Control type="file" name="file" multiple={false} onChange={handleSelectFile}/>
      </Form.Group>
        <Button variant='dark' type='submit' className='my-1'>
          Say Your View
        </Button>
      </Form>
    </div>
  );
};


export default PostForm;
