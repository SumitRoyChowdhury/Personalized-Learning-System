const express = require('express');
const router = express.Router();
const { registerUser, getUserAnalysis } = require('../controllers/userController');

// Mounted at /api
router.post('/register', registerUser);
router.get('/user/analysis', getUserAnalysis);

module.exports = router;
