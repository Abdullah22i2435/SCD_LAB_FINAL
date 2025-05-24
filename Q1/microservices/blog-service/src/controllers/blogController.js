const Blog = require('../models/Blog');

// Create a new blog
exports.createBlog = async (req, res) => {
    try {
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: req.user.id // Assuming req.user is set by auth middleware
        });
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'username');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a blog
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        await blog.remove();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};