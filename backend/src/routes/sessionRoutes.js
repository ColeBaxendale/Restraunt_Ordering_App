const express = require('express');
const router = express.Router();
const { login, register, authAdmin, authOwner} = require('../controllers/sessionController');
const {verifyToken} = require('../middleware/authenticate');

router.post('/login', login);
router.post('/register', register);
router.get('/auth/admin', verifyToken,authAdmin);
router.get('/auth/owner', verifyToken,authOwner);
router.get('/logout', (req, res) => {
    console.log('logout start');
    console.log(req.cookies['token']);
    res.clearCookie('token', { path: '/' }); 
    console.log('clear cookie');
    console.log(req.cookies['token']);

    res.status(200).send("Logged out successfully");
  });


module.exports = router;
