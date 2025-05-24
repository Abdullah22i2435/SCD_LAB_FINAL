const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();
app.use(express.json());

// Auth service routes
app.use('/api/auth', require('../auth-service/src/routes/auth'));

// Blog service routes
app.use('/api/blogs', authMiddleware, require('../blog-service/src/routes/blogs'));

// Comment service routes
app.use('/api/comments', require('../comment-service/src/routes/comments'));

// Profile service routes
app.use('/api/profile', authMiddleware, require('../profile-service/src/routes/profile'));

// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('error!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});