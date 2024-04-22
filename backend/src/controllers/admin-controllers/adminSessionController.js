const Admin = require('../../models/Admin')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: true });


  res.status(200).json({
    message: 'Successful Admin Login'
    })
}







// TO DELETE LATER


exports.register = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
  
  
    // Basic validation
    if (!username || !password) {
      return res.status(400).send("Username and password are required.");
    }
  
    try {
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return res.status(400).send("An account with this username already exists.");
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const admin = new Admin({
        username,
        password: hashedPassword,
      });
  
      const savedAdmin = await admin.save();
  
      res.status(200).json({
        message: "Admin registered successfully",
        admin: { id: savedAdmin._id, username: savedAdmin.username }
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  };