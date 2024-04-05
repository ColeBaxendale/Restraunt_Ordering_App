require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())
const corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true,
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.use(bodyParser.json());
app.use('/admin', adminRoutes);
// app.use('/owner', ownerRoutes);
app.use('/user', userRoutes);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
