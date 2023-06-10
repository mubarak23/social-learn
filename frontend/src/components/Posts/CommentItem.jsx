import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';

const CommentItem = (props) => {

//   {
//   postId,
//   comment: { _id, text, name, avatar, user, date },
//   auth,
// }

const {id,  comment, postId } = props

console.log(comment)

const { userInfo } = useSelector((state) => state.auth);
 return  (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${comment.user}`}>
        <img className="round-img" src={comment.photo} alt="" />
        <h4>{comment.name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{comment.text}</p>
      <p className="post-date">Posted on {formatDate(comment.date)}</p>
      {!userInfo && comment.user === userInfo._id && (
        <button
          // onClick={() => deleteComment(postId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times" />
        </button>
      )}
    </div>
  </div>
);

}

// CommentItem.propTypes = {
//   postId: PropTypes.string.isRequired,
//   comment: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired,
//   deleteComment: PropTypes.func.isRequired
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth
// });

export default CommentItem;
