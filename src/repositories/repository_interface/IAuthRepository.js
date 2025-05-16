class IAuthRepository {
    //async findUserByUsername(username) { }
    login(email) {
      throw new Error('Método getById() debe ser implementado.');
  }
}
module.exports = IAuthRepository;
