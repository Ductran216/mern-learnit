const { response } = require('express');
const Post = require('../models/Post');

class PostController {
    // POST api/posts
    // Create post
    // Private
    create = async (req, res) => {
        const { title, description, url, status } = req.body;

        // Validation
        if (!title) {
            return res.status(400).json({ success: false, message: 'Title is required' });
        }

        try {
            const newPost = new Post({
                title,
                description,
                url: url.startsWith('https://') ? url : `https://${url}`,
                status: status || 'TO LEARN',
                user: req.userId,
            });

            await newPost.save();

            res.json({ success: true, message: 'Happy learning!', post: newPost });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    };

    // GET api/posts
    // Show posts
    // Private
    show = async (req, res) => {
        try {
            const posts = await Post.find({ user: req.userId }).populate('user', ['username']);
            res.json({ success: true, posts });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    };

    // PUT api/posts/:id
    // Update post
    // Private
    update = async (req, res) => {
        const { title, description, url, status } = req.body;

        if (!title) {
            return res.status(400).json({ success: false, message: 'Title is required' });
        }

        try {
            let updatedPost = {
                title,
                description: description || '',
                url: (url.startsWith('https://') ? url : `https://${url}`) || '',
                status: status || 'TO LEARN',
            };

            const postUpdateCondition = { _id: req.params.id, user: req.userId };

            updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, { new: true });

            // User not authorized to update post or post not found
            if (!updatedPost) {
                return res
                    .status(401)
                    .json({ success: false, message: 'User not authorized to update post or post not found' });
            }

            res.json({ success: true, message: 'Post updated successfully', post: updatedPost });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    };

    // DELETE api/posts/:id
    // Delete post
    // Private
    delete = async (req, res) => {
        try {
            const postDeleteCondition = { _id: req.params.id, user: req.userId };

            const deletePost = await Post.findOneAndDelete(postDeleteCondition);

            // User not authorized to update post or post not found
            if (!deletePost) {
                return res
                    .status(401)
                    .json({ success: false, message: 'User not authorized to update post or post not found' });
            }

            res.json({ success: true, message: 'Post deleted successfully', post: deletePost });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    };
}

module.exports = new PostController();
