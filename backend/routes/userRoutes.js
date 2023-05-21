import express from 'express';
import {
  authUser, deleteMyProfile,
  getAllUsers, getUserProfile, logoutUser, registerUser, updateUserProfile
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/all', getAllUsers)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.delete('/delete', protect, deleteMyProfile)




export default router;
