const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/resourceController');

router.get('/recommendation', getRecommendations);

module.exports = router;
