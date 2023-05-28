import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";


// @desc    Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler (async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email })

    if(userExist){
      res.status(400)
      throw new Error('User Already Exist')
    }

    const user = await User.create({
      name,
      email,
      password
    })

    if(user){
      
      generateToken(res, user)
      res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });

    }else{
      res.status(400)
      throw new Error('Invalid User')
    }

})

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
            .populate('following', '_id name')
            .populate('followers', '_id name')
    
    if(user && (await user.matchPassword(password))){

      generateToken(res, user)
      res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      description: user.description,
      photo: user.photo,
      createdAt: user.createdAt,
       following: user.following,
      followers: user.followers,
    });

    }else {
       res.status(400)
      throw new Error('Invalid Credentials')
    }
})

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
              .populate('following', '_id name')
              .populate('followers', '_id name');

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      description: user.description,
      photo: user.photo,
      createdAt: user.createdAt,
      following: user.following,
      followers: user.followers,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @desc    Get user profile
// @route   GET /api/users/:userId
// @access  Public
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId)
              .populate('following', '_id name')
              .populate('followers', '_id name');

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      description: user.description,
      photo: user.photo,
      createdAt: user.createdAt,
      following: user.following,
      followers: user.followers,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @desc    Get All User
// @route   GET /api/users
// @access  Public
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  const allUsers = [];

  if (users) {
    for(let user of users){
      allUsers.push({
        _id: user._id,
      name: user.name,
      email: user.email
    })
  }
    res.json(allUsers);
  } else {
    res.status(404);
    throw new Error('Users not found');
  }
});


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.description = req.body.description || user.description;
    user.photo = req.body.photo || user.photo;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      description: updatedUser.description,
      photo: updatedUser.photo
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


// @desc    Delete user profile
// @route   DELETE /api/users
// @access  Private
const deleteMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    await User.deleteOne(user._id)
    return res.json({
      message: 'User Deleted Successfully'
    })
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    follow a user profile
// @route   PUT /api/users/follow
// @access  Private
const addFollowing = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.followId)
    if(!user){
       res.status(404);
    throw new Error('User not found');
    }
    // update my following lists
    const followAUser = await User.findByIdAndUpdate(req.user._id, { $push: {following: req.body.followId}}, { new: true})
  
    // update the user am following, his followers lists
  
    const updateUserFollowers = await User.findByIdAndUpdate(user._id, 
    { $push: { followers: req.user._id}}, { new: true})

    if(!followAUser && !updateUserFollowers){
      res.status(400);
    throw new Error('Operation Fail');
    } 
  return res.json({
      message: 'Follow was successful'
    })  
})

// @desc    unfollow a user profile
// @route   PUT /api/users/unfollow
// @access  Private

const removeFollowing = asyncHandler( async (req, res) => {
    const user = await User.findById(req.body.followId)
    if(!user){
       res.status(404);
    throw new Error('User not found');
    }
   // remove him from my following list
    const removeHimFromMyFollowList = await User.findByIdAndUpdate(req.user._id, { $pull: {following: req.body.followId}})
  
    // remove me from his followers list
   const removeMeFromHisFollowersList = await User.findByIdAndUpdate(user._id, 
    { $pull: { followers: req.user._id}}) 
  
   if(!removeHimFromMyFollowList && !removeMeFromHisFollowersList){
      res.status(400);
    throw new Error('Operation Fail');
    } 
  return res.json({
      message: ' Unfollow was successful'
    }) 
})

const findPeoples = asyncHandler (async (req, res) => {
  const following = req.user.following
  const users = await User.find({ _id: { $nin : following } })
  const userTofollows = users.filter((user) => user._id !== req.user._id)
   res.json(userTofollows);
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteMyProfile,
  getAllUsers,
  addFollowing,
  removeFollowing,
  getUser,
  findPeoples,
};


