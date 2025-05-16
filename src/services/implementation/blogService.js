const IBlogService = require('../service_interface/IBlogService');
const blogRepository = require('../../repositories/implementation/blogRepository');
const blogModel = require('../../models/blogModel');
class BlogService extends IBlogService {
    async getAllBlogs() {
      return await blogRepository.getAllBlogs();
    }

    async getBlog(id) {
        return await blogRepository.getBlog(id);
    }

    async postBlog(blogModel){
        console.log(blogModel)
        return await blogRepository.postBlog(blogModel);
    }

    async putBlog(blogModel){
        console.log(blogModel)
        return await blogRepository.putBlog(blogModel);
    }
    async deleteBlog(id){
        return await blogRepository.deleteBlog(id);
    }
}

module.exports = new BlogService();