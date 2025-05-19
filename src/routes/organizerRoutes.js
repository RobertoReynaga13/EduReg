const express = require('express');
const organizerRouters = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const organizerController = require('../controllers/organizerController');

organizerRouters.get('/organizadores', authMiddleware, organizerController.getOrganizers);
organizerRouters.get('/organizadores/nuevo',authMiddleware, organizerController.newOrganizer);
organizerRouters.post('/organizadores', authMiddleware, organizerController.postOrganizer);
organizerRouters.get('/organizadores/editar/:id',authMiddleware, organizerController.getOrganizer);
organizerRouters.post('/organizadores/editar/:id',authMiddleware, organizerController.putOrganizer);
organizerRouters.get('/organizadores/inscribir/:id',authMiddleware, organizerController.inscribirOrganizer);
organizerRouters.get('/organizadores/inscritos/:id',authMiddleware, organizerController.verlistaInscritos);
organizerRouters.get('/organizadores/inscritos/:id',authMiddleware, organizerController.verlistaInscritos);
module.exports = organizerRouters;
