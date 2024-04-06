const express = require('express');
const router = express.Router();
const { login, register, authAdmin, authOwner} = require('../controllers/userController');
const {verifyToken} = require('../middleware/authenticate');

router.post('/login', login);
router.post('/register', register);
router.get('/auth/admin', verifyToken,authAdmin);
router.get('/auth/owner', verifyToken,authOwner);



module.exports = router;
