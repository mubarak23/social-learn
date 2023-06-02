import express from 'express';
import { createPost, feedPosts, getPostDetails, getUserPosts } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/feed', protect, feedPosts)

router.get('/:userId', getUserPosts)

router.get('/:postId', getPostDetails)

router.post('/', protect, createPost)


export default router