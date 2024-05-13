const express = require('express');
const router = express.Router();
const adminRestaurantController = require('../controllers/admin-controllers/adminRestaurantController')
const adminUserController = require('../controllers/admin-controllers/adminUserController')
const adminSessionController = require('../controllers/admin-controllers/adminSessionController')

const { verifyToken, checkRole } = require('../middleware/authenticate');

router.post('/login', adminSessionController.login);
router.post('/register', adminSessionController.register);
router.get('/verify-admin', verifyToken, checkRole(['admin']), (req, res) => {
  res.json({ authorized: true });
});
router.get('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' }); 
    res.status(200).send("Logged out successfully");
  });


router.post('/restaurants', verifyToken, checkRole(['admin']), adminRestaurantController.createRestaurant);
router.post('/restaurants-with-owner', verifyToken, checkRole(['admin']), adminRestaurantController.createRestaurantWithOwner);
router.get('/restaurants/:id', verifyToken, checkRole(['admin']), adminRestaurantController.getRestaurant);
router.put('/restaurants/:id/create-owner', verifyToken, checkRole(['admin']), adminRestaurantController.createOwnerAndUpdateRestaurant);
router.put('/restaurants/:id/delete-owner', verifyToken, checkRole(['admin']), adminRestaurantController.deleteOwnerAndUpdateRestaurant);

router.delete('/restaurants/:id', verifyToken, checkRole(['admin']), adminRestaurantController.deleteRestaurant);
router.get('/restaurants', verifyToken, checkRole(['admin']), adminRestaurantController.getAllRestaurants);
router.post('/restaurants/check-name', verifyToken, checkRole(['admin']), adminRestaurantController.checkRestaurantName);


router.post('/users', verifyToken, checkRole(['admin']), adminUserController.createUser);
router.post('/users/check-email', verifyToken, checkRole(['admin']), adminUserController.checkUserEmail);

router.get('/users', verifyToken, checkRole(['admin']), adminUserController.getAllUsers);
router.get('/users/:id', verifyToken, checkRole(['admin']), adminUserController.getUserById);
// router.post('/users/:id/reset', checkRole(['admin']).resetUserPassword);
router.delete('/users/:id', verifyToken, checkRole(['admin']), adminUserController.deleteUser);

module.exports = router;
