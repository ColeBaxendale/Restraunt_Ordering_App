const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const { authenticate, isAdmin } = require('../util/middleware/authMiddleware')

router.post('/restaurants', authenticate, isAdmin, adminController.createRestaurant);
router.get('/restaurants/:id', authenticate, isAdmin, adminController.getRestaurantByUniqueId);
router.put('/restaurants/:id', authenticate, isAdmin, adminController.updateRestaurant);
router.delete('/restaurants/:id', authenticate, isAdmin, adminController.deleteRestaurant);
router.get('/restaurants', authenticate, isAdmin, adminController.getAllRestaurants);

router.post('/users', authenticate, isAdmin, adminController.createUser);
router.get('/users', authenticate, isAdmin, adminController.getAllUsers);
router.get('/users/:id', authenticate, isAdmin, adminController.getUserById);
router.patch('/users/:id', authenticate, isAdmin, adminController.updateUser);
router.delete('/users/:id', authenticate, isAdmin, adminController.deleteUser);

module.exports = router;
