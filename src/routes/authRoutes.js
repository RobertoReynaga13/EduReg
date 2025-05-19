const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authRoutes = express.Router();

authRoutes.get('/', (req, res) => authController.renderLogin(req, res));
authRoutes.post('/login',  (req, res) => authController.login(req, res));
authRoutes.post('/logout', (req, res) => authController.logout(req, res));
authRoutes.post('/perfil', authMiddleware,  (req, res) => authController.perfil(req, res));
authRoutes.get('/registro', (req, res) => authController.registro(req, res));
authRoutes.post('/registro', (req, res) => authController.postRegistro(req, res));
authRoutes.get('/nosotros',authMiddleware, (req, res) => authController.nosotros(req, res));
module.exports = authRoutes;
