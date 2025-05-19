const express = require('express');
const racingRoutes = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const raceController = require('../controllers/raceController');

racingRoutes.get('/carreras',authMiddleware, raceController.getRacing);
racingRoutes.get('/carreras/nuevo',authMiddleware,raceController.newRace);
racingRoutes.post('/carreras',authMiddleware, raceController.postRace);
racingRoutes.get('/carreras/editar/:id',authMiddleware, raceController.getRace);
racingRoutes.post('/carreras/editar/:id',authMiddleware, raceController.putRace);
racingRoutes.post('/carreras/eliminar/:id',authMiddleware, raceController.deleteRace);

module.exports = racingRoutes;
