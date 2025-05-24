const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const profileRoutes = require('./routes/profile');

// Use routes
app.use('/api/profile', profileRoutes);

// MongoDB connection MONGO_URI=mongodb://mongodb:27017/blog-service

mongoose.connect('mongodb://localhost:27017/blog-service', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Profile service running on port ${PORT}`));