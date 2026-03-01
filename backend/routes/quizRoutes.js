const express = require('express');
const router = express.Router();
const { getQuiz, attemptQuiz } = require('../controllers/quizController');

router.get('/generate', getQuiz);
router.post('/attempt', attemptQuiz);

module.exports = router;
