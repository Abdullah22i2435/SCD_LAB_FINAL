const express = require('express');
const { createBlog, deleteBlog, getBlogs } = require('../controllers/blogController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, createBlog);           // Protected route for creating a blog
router.delete('/:id', authMiddleware, deleteBlog);      // Protected route for deleting a blog
router.get('/', getBlogs);                               // Public route for fetching blogs

module.exports = router;