const userService = require('../../src/services/implementation/userService');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel'); // Renombra a UserModel para que no lo confundas con la instancia
class userController {
  async getUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.render('usuarios/index', { users });
    } catch (error)
    {
      res.status(500).send('Error al cargar la página de inicio.');
    }
  }
  async newUser(req, res){
    res.render('usuarios/nuevo');
  }
  async postUser(req, res){
    try {
      console.log(req.body);
      // Extraer datos del request body  
      const { UsuarioID, AreaResponsable } = req.body;
      // Convertir los valores de UsuarioID si es necesario
      const usuarioID = parseInt(UsuarioID, 10);
      // Crear una nueva instancia de UserModel, pasando un objeto con las propiedades
      const newUser = new UserModel({
        PersonalID: null, // Establecer PersonalID como null si no se tiene
        UsuarioID: usuarioID, 
        Nombre: null,  // Nombre como null por defecto
        Correo: null,  // Correo como null por defecto
        AreaResponsable
      });

      console.log("Nuevo usuario:", newUser); // Verifica el contenido del nuevo usuario
      // Usar el servicio para agregar el nuevo usuario
      await userService.postUser(newUser);
      // Obtener la lista actualizada de usuarios
      const users = await userService.getAllUsers();

      res.render('usuarios', { users });
    } catch (error) {
      console.error('Error al agregar el usuario:', error.message);
      res.status(500).send('Error al agregar el usuario.');
    }
  }
  async getUser(req, res){
  }

  async getEditForm(req, res) {
    const userId = req.params.id; // Obtener el ID del blog de la URL
    console.log('id: ', userId);
    const user = await userService.getUserById(userId); // Llamada a la función getBlogById
    if (!user) return next();
    console.log(user);
    res.render('usuarios/editar', { user });
    };
  
  async putUser(req, res){
    try {
      const userId = req.params.id; // Obtener el ID del usuario de la URL
      console.log('id: ', userId);

      const updatedUser = {
        PersonalID: userId, // ID del usuario que se va a actualizar
        AreaResponsable: req.body.AreaResponsable // Obtener el nuevo valor del cuerpo de la solicitud
      }

      await userService.putUser(updatedUser);

      const users = await userService.getAllUsers();
      res.render('usuarios', { users });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error.message);
      res.status(500).send('Error al actualizar el usuario.');
    }
  }

  async deleteUser(req, res){
    try{
      const userId = req.params.id; 
      console.log('id: ', userId);
      await userService.deleteUser(userId);
      res.redirect('/usuarios'); // Redirigir a la lista de usuarios después de eliminar
    } catch (error) {
      console.error('Error al eliminar el usuario:', error.message);
      res.status(500).send('Error al eliminar el usuario.');
    }
  }
}

module.exports = new userController();
