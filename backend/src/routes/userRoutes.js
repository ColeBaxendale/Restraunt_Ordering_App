const express = require('express');
const router = express.Router();
const { login, register, authAdmin, authOwner} = require('../controllers/userController');
const {verifyToken} = require('../middleware/authenticate');

router.post('/login', login);
router.post('/register', register);
router.get('/auth/admin', verifyToken,authAdmin);
router.get('/auth/owner', verifyToken,authOwner);
router.get('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' }); // Replace 'tokenName' with the actual name of your token cookie
    res.status(200).send("Logged out successfully");
  });


module.exports = router;
