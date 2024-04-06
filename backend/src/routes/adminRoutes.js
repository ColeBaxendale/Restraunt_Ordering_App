const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const { authenticate, isAdmin } = require('../util/middleware/authMiddleware');
const { verifyToken } = require('../middleware/authenticate');

router.post('/restaurants', verifyToken, isAdmin, adminController.createRestaurant);
router.get('/restaurants/:id', verifyToken, isAdmin, adminController.getRestaurantByUniqueId);
router.put('/restaurants/:id', verifyToken, isAdmin, adminController.updateRestaurant);
router.delete('/restaurants/:id', verifyToken, isAdmin, adminController.deleteRestaurant);
router.get('/restaurants', verifyToken, isAdmin, adminController.getAllRestaurants);

router.post('/users', verifyToken, isAdmin, adminController.createUser);
router.get('/users', verifyToken, isAdmin, adminController.getAllUsers);
router.get('/users/:id', verifyToken, isAdmin, adminController.getUserById);
router.patch('/users/:id', verifyToken, isAdmin, adminController.updateUser);
router.delete('/users/:id', verifyToken, isAdmin, adminController.deleteUser);

module.exports = router;
