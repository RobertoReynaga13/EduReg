const IUserService = require('../service_interface/IUserService');
const userRepository = require('../../repositories/implementation/userRepository');

class UserService extends IUserService {
    async getAllUsers() {
      return await userRepository.getAllUsers();
    }

    async postUser(userModel){
        return await userRepository.postUser(userModel);
    }

    async getUserById(id) {
        return await userRepository.getUserById(id);
    }

    async putUser(userModel) {
        console.log(userModel)
        return await userRepository.putUser(userModel);
    }

    async deleteUser(id) {
        return await userRepository.deleteUser(id);
    }

}

module.exports = new UserService();
