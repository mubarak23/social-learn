import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAddCommentMutation } from '../../slices/postsApiSlice';

const CommentForm = ({ postId }) => {
  const [text, setText] = useState('');

    const [addComment, { isLoading}] = useAddCommentMutation()

    const submitAddMyCommentHandler = async (e) => {
    e.preventDefault()

    try {
      await addComment({ text, postId}).unwrap()
      toast.success('Comment Added')
      navigate(`/posts/${postId}`)
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

  }



  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <Form
        className='form my-1'
        onSubmit={submitAddMyCommentHandler}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment the post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </Form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default CommentForm;
