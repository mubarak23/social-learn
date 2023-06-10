import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useGetPostDetailsMutation } from '../../slices/postsApiSlice';
import Loader from '../Loader';
import CommentItem from '../Posts/CommentItem';
import PostItem from '../Posts/PostItem';
import CommentForm from './CommentForm';

const Post = () => {
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
      <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </section>
      )}
    </Container>
  )
  
};



export default Post;
