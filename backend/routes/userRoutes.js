import express from 'express';
import {
  addFollowing, authUser, deleteMyProfile, findPeoples, getAllUsers, getUser,
  getUserProfile, logoutUser, registerUser, removeFollowing,
  updateUserProfile
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/all', getAllUsers)
router.get('/findPeoples', protect, findPeoples)

router.get('/profile', protect, getUserProfile)

router.get('/:userId', getUser)

 
router.put('/profile', protect, updateUserProfile)

router.delete('/delete', protect, deleteMyProfile)

router.put('/follow', protect, addFollowing)

router.put('/unfollow', protect, removeFollowing)






export default router;
