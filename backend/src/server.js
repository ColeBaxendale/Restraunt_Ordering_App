require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const userRoutes = require('./routes/userRoutes');




const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/admin', adminRoutes);
// app.use('/owner', ownerRoutes);
app.use('/user', userRoutes);
app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
