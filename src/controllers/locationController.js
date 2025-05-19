const locationService = require("../services/implementation/locationService");
const catalogService = require('../services/implementation/catalogService');
const LocationModel = require('../models/locationModel');
class locationController {
  async getLocations(req, res) {
    try {
      const locations = await locationService.getLocations();
      console.log(locations);
      res.render('ubicaciones/', { locations, user: req.user.userId, tipousuario: req.user.tipousuario });
    } catch (error) {
      res.status(500).send('Error al cargar pagina inicio.');
    }
  }
  async newLocation(req, res) {
    const catCountry = await catalogService.getCatCountries();
    const catState = await catalogService.getCatStates();
    res.render('ubicaciones/nuevo', { countryData: catCountry.message, stateData: catState.message, user: req.user.userId, tipousuario: req.user.tipousuario });
  }
  async postLocation(req, res) {
    const {
      UbicacionID,
      Lugar,
      Coordenadas,
      PaisID,
      EstadoID
    } = req.body;

    const newLocation = new LocationModel(
      UbicacionID,
      Lugar,
      Coordenadas,
      PaisID,
      EstadoID
    );

    await locationService.postLocation(newLocation);
    res.redirect('/ubicaciones');
  }

  async getLocation(req, res) {
    const id = parseInt(req.params.id);
    const location = await locationService.getLocation(id);
    const catCountry = await catalogService.getCatCountries();
    const catState = await catalogService.getCatStates();
    if(location){
      res.render('ubicaciones/editar', { location, countryData: catCountry.message, stateData: catState.message, user: req.user.userId, tipousuario: req.user.tipousuario });
    } else {
      res.status(404).send('Ubicación no encontrada')
    }
  }

  async putLocation(req, res) {
    try{
      const ubicacionId = req.params.id;
      const updatedLocation = {
        UbicacionID: ubicacionId,
        Lugar: req.body.Lugar,
        Coordenadas: req.body.Coordenadas, 
        PaisID: req.body.PaisID,
        EstadoID: req.body.EstadoID
      } 
      
      await locationService.putLocation(updatedLocation);
      //const locations = await locationService.getLocations();
      res.redirect('/ubicaciones/')
    } catch (error) {
      console.error('Error al actualizar la ubicacion:', error.message);
      res.status(500).send('Error al actualizar la ubicacion.');
    }
  }

  async deleteLocation(req, res) {
    try {
      const locationId = req.params.id;
      await locationService.deleteLocation(locationId);
      res.redirect('/ubicaciones');
    } catch (error) {
      res.status(500).send('Error al eliminar la ubicacíón.')
    }

  }
}
module.exports = new locationController();
