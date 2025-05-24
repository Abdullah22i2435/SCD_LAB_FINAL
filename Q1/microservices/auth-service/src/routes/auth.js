const express = require('express');
const { register, login } = require('../controllers/authController');
const validateMiddleware = require('../middleware/validate');
const router = express.Router();

router.post('/register', validateMiddleware, register); // User registration
router.post('/login', validateMiddleware, login);       // User login

module.exports = router;