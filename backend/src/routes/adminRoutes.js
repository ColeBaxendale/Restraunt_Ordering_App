const express = require('express');
const router = express.Router();
const { createRestaurant, getAllRestaurants, updateUserRole } = require('../controllers/restaurantController');
const { authenticate, isAdmin } = require('../util/middleware/authMiddleware')

router.post('/restaurants', authenticate, isAdmin, createRestaurant);
router.get('/restaurants', authenticate, isAdmin, getAllRestaurants);
router.put('/users/role', authenticate, isAdmin, updateUserRole);

module.exports = router;
