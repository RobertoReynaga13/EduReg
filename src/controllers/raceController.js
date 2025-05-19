const catalogService = require('../services/implementation/catalogService');
const raceService = require('../services/implementation/raceService');
const raceModel = require('../models/raceModel');

class raceController {
  async getRacing(req, res) {
      try {
        const races = await raceService.getRaces();

        console.log("=============== R E S U L T A D O carreras");
        console.log(req.user.userId);

        res.render('carreras/', { races: JSON.stringify(races), user: req.user.userId, tipousuario: req.user.tipousuario, username: req.user.username });
      } catch (error) {
        res.status(500).send('Error al cargar pagina inicio.');
      }
  }
  async newRace(req, res){
    const catOrganizer = await catalogService.getCatOrganizers();
    const catLocation = await catalogService.getCatLocationes();
    res.render('carreras/nuevo', { organizerData: catOrganizer.message, locationData: catLocation.message, user: req.user.userId, tipousuario: req.user.tipousuario, username: req.user.username  });
  }
  async postRace(req, res){
    const newRace = new raceModel(
      null, // Id no se necesita en la creación
      req.body.Titulo,
      req.body.Descripcion,
      req.body.Fecha,
      req.body.OrganizadorId,
      req.body.UbicacionId,
      req.body.Publicado,
      true // Activo por defecto
    );

    await raceService.postRace(newRace, req.user.userId);
    res.redirect('carreras/');
  }
  async getRace(req, res){
  }
  async putRace(req, res){
  }
  async deleteRace(req, res){
  }
}
module.exports = new raceController();
