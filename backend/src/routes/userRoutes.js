const express = require('express');
const router = express.Router();
const { login, register, verifyUser } = require('../controllers/userController');
const verifyToken = require('../middleware/authenticate')

router.post('/login', login);
router.post('/register', register);
router.get('/verify', verifyToken, verifyUser);

module.exports = router;
