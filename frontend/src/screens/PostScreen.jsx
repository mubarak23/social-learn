import { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { useGetPostDetailsMutation } from '../slices/postsApiSlice';

const PostScreen = () => {
    const [err, setErr] = useState()
    const [post, setPost] = useState()
    const [nowLoading, setNowLoading] = useState(true)
    // const { post, auth, classes, values } = props;

      const { postId } = useParams()


    const { userInfo } = useSelector((state) => state.auth);
    // eslint-disable-next-line no-unused-vars
    const [getPostDetails, { isLoading }] = useGetPostDetailsMutation(postId)
   useEffect(() => {
    console.log('From inside useEffect call')
    const fetchData = async () => {
          try {
            const data = await getPostDetails(postId).unwrap()
            console.log(data)
            setPost(data)
            setNowLoading(false)
          } catch (error) {
            console.log(error)
            setErr(error)
          }
    }
  fetchData()
     
  }, [])

  return (
    <Container>
      {nowLoading ? (
        <Loader />
      ) : err ? (
          <h3>{err}</h3>
      ) : (
        <Card>
      <Card.Header>
        <image src={`/api/users/photo/${post.postedBy.photo}`} />
        {post.postedBy._id === userInfo._id && (
          <Button variant="link">
            Delete
          </Button>
        )}
        <LinkContainer to={`/user/${post.postedBy._id}`}><h4>{post.postedBy.name}</h4></LinkContainer>
      </Card.Header>
      <Card.Body>
        <Card.Text>{post.content}</Card.Text>
        {post.photo && (
          <div>
            <img
              src={`/api/posts/photo/${post.photo}`}
              alt="Post"
            />
          </div>
        )}
      </Card.Body>
      <Card.Footer>
        {post.like ? (
          <Button
            className='btn btn-success'
            aria-label="Like"
            variant="secondary"
          >
            Like
          </Button>
        ) : (
          <Button
            className='btn btn-success'
            aria-label="Unlike"
            variant="secondary"
          >
            Unlike
          </Button>
        )}
        <span>{post.comments}</span>
        <Button
          className='btn btn-success'
          aria-label="Comment"
          variant="secondary"
        >
          Comment
        </Button>
        <span>{post.comments.length}</span>
      </Card.Footer>
    </Card>
      )}
    </Container>
    
  );
};

export default PostScreen;
