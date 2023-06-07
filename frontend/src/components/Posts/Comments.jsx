import { useState } from 'react';
import { Button, Card, Form, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Comments = (props) => {
const { post } = props
const [text, setText] = useState()

  const { userInfo } = useSelector((state) => state.auth);

const commentBody = item => {
  return (
    <p >
      <Link to={"/user/" + props.postedBy._id}>{item.postedBy.name}</Link><br/>
      {item.text}
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
    <Link to={`/users/${post.postedBy._id}`}>
          <Image className="round-img" src={post.postedBy.photo} alt="" />
    </Link>
    <Form className='my-1'>
      <Form.Group>
        <Form.Control
          // onKeyDown={addComment}
          as="textarea"
          value={text}
          // onChange={handleChange}
          placeholder="Write something ..."
          
        />
      </Form.Group>
    </Form>
  </div>

     { props.comments.map((item, i) => {
        return <CardHeader
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








