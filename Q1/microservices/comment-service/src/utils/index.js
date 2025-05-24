// filepath: mern-microservices-backend/comment-service/src/utils/index.js
const createError = require('http-errors');

const handleError = (err, res) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
};

const validateCommentContent = (content) => {
  if (!content || content.trim().length === 0) {
    throw createError(400, 'Comment content cannot be empty');
  }
};

module.exports = {
  handleError,
  validateCommentContent,
};