const express = require('express');
const { getUserProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/:id', protect, getUserProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;