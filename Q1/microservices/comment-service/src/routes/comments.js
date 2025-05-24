const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, addComment);           // Protected route for adding comments
router.get('/:blogId', getComments);                    // Public route for fetching comments by blog ID

module.exports = router;