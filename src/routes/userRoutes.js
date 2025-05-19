const express = require('express');
const userRoutes = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

userRoutes.get('/usuarios',authMiddleware, userController.getUsers);
userRoutes.get('/usuarios/nuevo',authMiddleware, userController.newUser);
userRoutes.post('/usuarios/nuevo',authMiddleware, userController.postUser);
userRoutes.get('/usuarios/editar/:id',authMiddleware, userController.getEditForm);
userRoutes.post('/usuarios/editar/:id',authMiddleware, userController.putUser);
userRoutes.get('/usuarios/eliminar/:id',authMiddleware, userController.deleteUser);

module.exports = userRoutes;
