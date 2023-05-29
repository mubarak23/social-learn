import { Badge, Button, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

const PostItem = (
  {
    key,
  authUser,
  post,
  }
) => {


return (
  <Card className="post bg-white p-1 my-1">
    <Card.Body>
      <div>
        <Link to={`/profile/${post.postedBy._id}`}>
          <Image className="round-img" src={post.postedBy.photo} alt="" />
          <h4>{post.postedBy.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{post.content}</p>
        <p className="post-date">Posted on {formatDate(post.createdAt)}</p>

        <Button variant="light">
          <i className="fas fa-thumbs-up" />{' '}
          <span>{post.likes.length > 0 && <Badge>{post.likes.length}</Badge>}</span>
        </Button>
        <Button  variant="light">
          <i className="fas fa-thumbs-down" />
        </Button>
        <Link to={`/posts/${post._id}`} className="btn btn-primary">
          Discussion{' '}
          {post.comments.length > 0 && (
            <span className="comment-count">{post.comments.length}</span>
          )}
        </Link>
        {!authUser && post.postedBy._id === authUser.user._id && (
          <Button variant="danger">
            <i className="fas fa-times" />
          </Button>
        )}
      </div>
    </Card.Body>
  </Card>
);

}

// PostItem.propTypes = {
//   post: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired,
//   addLike: PropTypes.func.isRequired,
//   removeLike: PropTypes.func.isRequired,
//   deletePost: PropTypes.func.isRequired,
// };



export default PostItem;
