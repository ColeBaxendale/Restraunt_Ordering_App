const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {

  const token = req.cookies['token']; // Now `req.cookies` should be defined

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

exports.isAdmin = (req, res,next) => {
  if (req.user.role === 'admin') {
    next()  
  } else {
    res.status(403).json({ message: "Access denied. Requires owner role." });
  }
};

