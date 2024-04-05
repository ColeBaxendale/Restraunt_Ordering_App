const express = require('express');
const router = express.Router();
const { createRestaurant, getAllRestaurants } = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../util/middleware/authMiddleware')

router.post('/restaurants', authenticate, isAdmin, createRestaurant);
router.get('/restaurants', authenticate, isAdmin, getAllRestaurants);

module.exports = router;
