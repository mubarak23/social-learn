
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PostForm from '../components/Posts/PostForm';
import PostItem from '../components/Posts/PostItem';
import { useGetPostsFeedQuery } from '../slices/postsApiSlice';
const PostsScreen = () => {
 

  const { userInfo } = useSelector((state) => state.auth);

  const { data, isLoading, error } = useGetPostsFeedQuery();


  return (
    <>
     {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
         <Container>
      <Row>
        <Col>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome to the Social learn
          </p>
          <PostForm />
          <div className="posts">
            {data.map((item) => (
              <PostItem key={item._id} authUser={userInfo} post={item} />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  )}
      
    </>
  )
};


export default PostsScreen;
