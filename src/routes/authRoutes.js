const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const authRoutes = express.Router();

authRoutes.get('/', (req, res) => authController.renderLogin(req, res));
authRoutes.post('/login',  (req, res) => authController.login(req, res));
authRoutes.post('/logout', (req, res) => authController.logout(req, res));
authRoutes.post('/perfil', authMiddleware,  (req, res) => authController.perfil(req, res));
module.exports = authRoutes;
