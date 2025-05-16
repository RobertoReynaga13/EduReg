const countryService = require('../../src/services/implementation/countryService');
const CountryModel = require('../models/countryModel');

class countryController {
  async getCountries(req, res) {
    try {
      const countries = await countryService.getCountries();
      console.log(countries);
      res.render('paises/index', { countries });
    } catch (error) {
      res.status(500).send('Error al cargar página');
    }
  }
  async newCountry(req, res) {
    res.render('paises/nuevo');
  }
  async postCountry(req, res) {
    try {
      console.log(req.body);
      // Extraer datos del request body
      const {UsuarioID, NumControl} = req.body;

      const usuarioID = parseInt(UsuarioID, 10);

      const newCountry = new CountryModel({
        EstudianteID: null, // Establecer EstudianteID como null si no se tiene
        UsuarioID: usuarioID,
        Nombre: null,  // Nombre como null por defecto
        Correo: null,  // Correo como null por defecto
        NumControl
      });

      console.log("Nuevo estudiante:", newCountry); // Verifica el contenido del nuevo pais

      await countryService.postCountry(newCountry);

      const countries = await countryService.getCountries();

      res.render('paises', { countries});
    } catch (error) {
      console.error('Error al agregar el pais:', error.message);
      res.status(500).send('Error al agregar el pais.');
    }

  }

  async getCountry(req, res) {
    const id = parseInt(req.params.id);
    const country = await countryService.getCountry(id);
    console.log(country);
    if (country) {
      res.render('paises/editar', { country });
    } else {
      res.status(404).send('Estudiante no encontrado')
    }
  }

  async putCountry(req, res) {
    try {
      const paisId = req.params.id;
      const updatedCountry = {
        PaisID: paisId,
        NombrePais: req.body.NombrePais,
        CodigoISO: req.body.CodigoISO
      }

      await countryService.putCountry(updatedCountry);
      const countries = await countryService.getCountries();
      res.render('paises/index', { countries })
    } catch (error) {
      console.error('Error al actualizar el pais:', error.message);
      res.status(500).send('Error al actualizar el pais.');
    }
  }

  async deleteCountry(req, res) {
    try {
      const countryId = req.params.id;
      console.log(countryId);
      await countryService.deleteCountry(countryId);
      res.redirect('/paises');
    } catch (error) {
      res.status(500).send('Error al eliminar el pais.')
    }
  }

}
module.exports = new countryController();
