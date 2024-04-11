const express = require('express');
const router = express.Router();
const adminRestaurantController = require('../controllers/adminRestaurantController')
const adminUserController = require('../controllers/adminUserController')

const { isAdmin } = require('../util/middleware/authMiddleware');
const { verifyToken } = require('../middleware/authenticate');

router.post('/restaurants', verifyToken, isAdmin, adminRestaurantController.createRestaurant);
router.get('/restaurants/:id', verifyToken, isAdmin, adminRestaurantController.getRestaurant);
router.put('/restaurants/:id', verifyToken, isAdmin, adminRestaurantController.updateRestaurant);
router.delete('/restaurants/:id', verifyToken, isAdmin, adminRestaurantController.deleteRestaurant);
router.get('/restaurants', verifyToken, isAdmin, adminRestaurantController.getAllRestaurants);

router.post('/users', verifyToken, isAdmin, adminUserController.createUser);
router.get('/users', verifyToken, isAdmin, adminUserController.getAllUsers);
router.get('/users/:id', verifyToken, isAdmin, adminUserController.getUserById);
router.patch('/users/:id', verifyToken, isAdmin, adminUserController.updateUser);
router.delete('/users/:id', verifyToken, isAdmin, adminUserController.deleteUser);

module.exports = router;
