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


export { createPost, feedPosts };

