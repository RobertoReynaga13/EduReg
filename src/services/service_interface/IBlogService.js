const blogModel = require('../../models/blogModel');

class IBlogService {
    async getAllBlogs() { }
    async getBlog(id) { }
    async postBlog(blogModel){}
    async putBlog(blogModel){}
    async deleteBlog(id){}
  }
  
  module.exports = IBlogService;