require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200', // Adjust according to your frontend host
  credentials: true, // To accept cookies via cross-origin requests
}));
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.use(bodyParser.json());
app.use('/admin', adminRoutes);
// app.use('/owner', ownerRoutes);
app.use('/user', userRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
