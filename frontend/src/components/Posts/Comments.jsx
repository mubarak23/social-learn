import { useState } from 'react';
import { Button, Card, Form, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAddCommentMutation } from '../../slices/postsApiSlice';

const Comments = (props) => {
  const { post } = props
  const [comment, setComment] = useState()
  const postId = post._id
  const { userInfo } = useSelector((state) => state.auth);
  const [addComment, { isLoading}] = useAddCommentMutation()
  
    const addMyComment = async (e) => {
      if(e.keyCode == 13 && e.target.value){
          try {
              await addComment({ comment, postId}).unwrap()
              navigate(`/posts/${postId}`)
        } catch (err) {
              toast.error(err?.data?.message || err.error);
        }
      }
  }


const commentBody = item => {
  return (
    <p >
      <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link><br/>
      {item.comment}
      <span>
        {new Date(item.date).toDateString()} |
        {userInfo._id === item.postedBy._id && (
          <Button variant="link">
            Delete
          </Button>
        )}
      </span>
    </p>
  );
};

  return (
   <div>
    <Card.Header>
  <div style={{display: "inline-block"}}>
   <div>
     <Link to={`/users/${post.postedBy._id}`}>
          <Image height={50} width={40} src={post.postedBy.photo} alt="" />
    </Link>
   </div>
    <div>
        <Form.Control
          onKeyDown={addMyComment}
          as="textarea"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write something ..."
          
        />
    </div>
  </div>

     { props.comments.map((item, i) => {
        return <Card.Header
            avatar={
              <Image className="round-img" src={post.postedBy.photo} alt="" />
                }
                title={commentBody(item)}
                key={i}/>
              })
        }
  
</Card.Header>
   </div>
  )
}

export default Comments








