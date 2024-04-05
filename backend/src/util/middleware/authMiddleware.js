const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(401).send('Access Denied: No token provided.');
  }
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Add user payload to request
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).send('Access denied. Admins only.');
  }
};
