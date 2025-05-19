const express = require('express');
const countryRoutes = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const countryController = require('../controllers/countryController');

countryRoutes.get('/paises', authMiddleware, countryController.getCountries);
countryRoutes.get('/paises/nuevo', authMiddleware, countryController.newCountry);
countryRoutes.post('/paises/nuevo', authMiddleware, countryController.postCountry);
countryRoutes.get('/paises/editar/:id', authMiddleware, countryController.getCountry);
countryRoutes.post('/paises/editar/:id', authMiddleware, countryController.putCountry);
countryRoutes.get('/paises/eliminar/:id', authMiddleware, countryController.deleteCountry);

module.exports = countryRoutes;
