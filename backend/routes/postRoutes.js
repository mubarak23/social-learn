import express from 'express';
import { createPost, deletePost, feedPosts, getPostDetails, getUserPosts } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/feed', protect, feedPosts)

router.get('/:postId', getPostDetails)

router.get('/user/:userId', protect, getUserPosts)



router.post('/', protect, createPost)

router.delete('/:postId', deletePost)

export default router