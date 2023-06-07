import asyncHandler from "express-async-handler";
import Post from '../models/post.js';


// @desc    Create a new Post
// @route   POST /api/posts
// @access  Private

const createPost = asyncHandler( async(req, res) => {
  const { content } = req.body;
  if(!content){
    res.status(402)
    throw new Error('Content field must be pass with content')
  }

  const newPost = await Post.create({
    content,
    photo: req.body.photo,
    postedBy: req.user._id
  })

  if(newPost){
    res.status(201).json(true);
  }else{
    res.status(400)
    throw Error('Post Creation Failed, Try Again')
  }
})

// @desc     Post Feeds
// @route   GET /api/posts/feed
// @access  Private

const feedPosts = asyncHandler (async (req, res) => {
  const following = req.user.following
  following.push(req.user._id)

  let posts = await Post.find({postedBy:{ $in :
   following }})
  .populate('comments.postedBy', '_id name following followers')
  .populate('postedBy', '_id name')
  .sort('-createdBy')
  .exec()
  res.json(posts)

})

// @desc     User Posts
// @route   GET /api/posts/:userId
// @access  Private

const getUserPosts = asyncHandler (async (req, res) => {
  const posts = await Post.find({ postedBy: req.params.userId})
                .populate('comments.postedBy', '_id name')
                .populate('postedBy', '_id name')
                .sort('-created')
                .exec()
     res.json(posts)           
})

// @desc     Single Post
// @route   GET /api/posts/:postId
// @access  public 

const getPostDetails = asyncHandler( async( req, res) => {
  
  const post = await Post.findOne({ _id: req.params.postId})
              .populate('postedBy', '_id name photo')
              .populate('comments', '_id postedBy text date')
              .populate('comments.postedBy', '_id name photo')
              .exec()
  if(!post){
     res.status(404)
    throw Error('Post Not Found')
  }
  
  res.json(post)
})


// @desc     Delete Post
// @route     DELETE /api/posts/:postId
// @access  private
const deletePost = asyncHandler( async(req, res) => {
    const post = await post.findOne({ _id: req.params.postId })
    if(!post){
      res.status(404)
      throw Error('Post Does Not Exist')
    }
    if(post.postedBy !== req.user._id){
      res.status(401)
      throw Error('Can Delete Other User Post')
    }

    const deletePost = await Post.delete({ _id: post._id})

    if(!deletePost){
      res.status(400)
      throw Error('Fail to Delete post, Try Again')
    }
  res.status(200).json(true); 
    
})


// @desc     Comment On Post
// @route    DELETE /api/posts/comment
// @access  private

const addCommentOnPost = asyncHandler ( async (req,  res) => {
  let comment = req.body.comment;
  comment.postedBy = req.user_id;
  let addComment = await Post.Post.findByIdAndUpdate( req.body.postId, 
        { $push: {comments: comment}}, { new: true})
        .populate('comments.postedBy', '_id name')
        .populate('postedBy', '_id name')
        .exec()
  if(!addComment){
      res.status(400)
      throw Error('Fail to add comment on post, Try Again')
    }
  res.status(201).json(addComment);     
})

export { createPost, feedPosts, getUserPosts, getPostDetails, deletePost, addCommentOnPost };

