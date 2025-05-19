const express = require('express');
const locationRoutes = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const LocationController = require('../controllers/locationController');

locationRoutes.get('/ubicaciones',authMiddleware, LocationController.getLocations);
locationRoutes.get('/ubicaciones/nuevo',authMiddleware, LocationController.newLocation);
locationRoutes.post('/ubicaciones/nuevo',authMiddleware, LocationController.postLocation);
locationRoutes.get('/ubicaciones/editar/:id',authMiddleware, LocationController.getLocation);
locationRoutes.post('/ubicaciones/editar/:id',authMiddleware, LocationController.putLocation);
locationRoutes.get('/ubicaciones/eliminar/:id',authMiddleware, LocationController.deleteLocation);

module.exports = locationRoutes;
