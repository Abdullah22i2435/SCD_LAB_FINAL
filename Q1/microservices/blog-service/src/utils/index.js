// filepath: mern-microservices-backend/blog-service/src/utils/index.js
const validateBlogData = (data) => {
  const { title, content } = data;
  if (!title || !content) {
    throw new Error('Title and content are required');
  }
  return true;
};

const formatBlogResponse = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    content: blog.content,
    author: blog.author,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  };
};

module.exports = {
  validateBlogData,
  formatBlogResponse,
};