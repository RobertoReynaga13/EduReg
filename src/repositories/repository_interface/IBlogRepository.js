const blogModel = require('../../models/blogModel');

class IBlogRepository {
    async getAllBlogs() { }
    async getBlogById(id) { }
    async addBlog(blogModel){}
    async updateBlog(blogModel) {}
    async deleteBlog(id){}
}

module.exports = IBlogRepository;
