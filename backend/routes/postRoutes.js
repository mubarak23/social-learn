import express from 'express';
import { createPost, feedPosts } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/feed', protect, feedPosts)

router.post('/', protect, createPost)


export default router