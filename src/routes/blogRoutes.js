const express = require('express');
const blogRouters = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const blogController = require('../controllers/blogController');

blogRouters.get('/blogs', authMiddleware, blogController.getHomePage);

blogRouters.get('/blogs/nuevo', authMiddleware, blogController.getBlog);
blogRouters.post('/blogs/nuevo', authMiddleware, blogController.postBlog);
blogRouters.get('/blogs/editar/:id', authMiddleware, blogController.getEditForm);
blogRouters.post('/blogs/editar/:id', authMiddleware, blogController.putBlog);
blogRouters.get('/blogs/eliminar/:id', blogController.deleteBlog);
module.exports = blogRouters;