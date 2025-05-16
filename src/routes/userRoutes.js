const express = require('express');
const userRoutes = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

userRoutes.get('/usuarios',authMiddleware, userController.getUsers);
userRoutes.get('/usuarios/nuevo',authMiddleware, userController.newUser);
userRoutes.post('/usuarios/nuevo',authMiddleware, userController.postUser);
userRoutes.get('/usuarios/editar/:id',userController.getEditForm);
userRoutes.post('/usuarios/editar/:id',userController.putUser);
userRoutes.get('/usuarios/eliminar/:id',userController.deleteUser);

module.exports = userRoutes;
