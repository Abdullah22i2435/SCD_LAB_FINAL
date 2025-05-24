const Comment = require('../models/Comment');

// Add a comment
exports.addComment = async (req, res) => {
    const { blogId, content } = req.body;

    try {
        const newComment = new Comment({
            blogId,
            content,
            author: req.user.id // Assuming req.user is set by the auth middleware
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error });
    }
};

// Get comments for a blog
exports.getComments = async (req, res) => {
    const { blogId } = req.params;

    try {
        const comments = await Comment.find({ blogId }).populate('author', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};