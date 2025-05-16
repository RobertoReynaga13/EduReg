const express = require('express');
const locationRoutes = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const LocationController = require('../controllers/locationController');

locationRoutes.get('/ubicaciones',LocationController.getLocations);
locationRoutes.get('/ubicaciones/nuevo',LocationController.newLocation);
locationRoutes.post('/ubicaciones/nuevo',LocationController.postLocation);
locationRoutes.get('/ubicaciones/editar/:id',LocationController.getLocation);
locationRoutes.post('/ubicaciones/editar/:id',LocationController.putLocation);
locationRoutes.get('/ubicaciones/eliminar/:id',LocationController.deleteLocation);

module.exports = locationRoutes;
