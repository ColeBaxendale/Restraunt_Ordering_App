require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const restaurantRoutes = require('./routes/restaurantRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
