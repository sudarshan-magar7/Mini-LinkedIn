const express = require('express');
const { 
  getPosts, 
  createPost, 
  getUserPosts, 
  deletePost 
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getPosts)
  .post(protect, createPost);

router.route('/:id')
  .delete(protect, deletePost);

router.get('/user/:userId', protect, getUserPosts);

module.exports = router;