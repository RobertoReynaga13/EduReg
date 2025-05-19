const organizerService = require('../services/implementation/organizerService');
const organizerModel = require('../models/organizerModel');

class organizerController {
  async getOrganizers(req, res) {
    try {
      const organizers = await organizerService.getOrganizers();

      res.render('organizadores/', { organizers: JSON.stringify(organizers), user: req.user.userId, tipousuario: req.user.tipousuario, username: req.user.username });
    } catch (error) {
      res.status(500).send('Error al cargar la página de inicio.');
    }
  }

  async newOrganizer(req, res) {
    res.render('organizadores/nuevo', { user: req.user.userId, tipousuario: req.user.tipousuario, username: req.user.username });
  }

  async postOrganizer(req, res) {
    const {
      OrganizadorID,
      NombreOrganizador,
      Facebook,
      Instagram,
      Web,
      Email,
      Telefono } = req.body;

    const newOrganizer = new organizerModel(
      OrganizadorID,
      NombreOrganizador,
      Facebook,
      Instagram,
      Web,
      Email,
      Telefono);

    await organizerService.postOrganizer(newOrganizer);
    res.redirect('/organizadores');
  }

  async getOrganizer(req, res) {
    const id = parseInt(req.params.id);
    const organizer = await organizerService.getOrganizer(id);

    if (organizer) {
      res.render('organizadores/editar', { organizer, user: req.user.userId, tipousuario: req.user.tipousuario, username: req.user.username });
    } else {
      res.status(404).send('Organizador no encontrado');
    }
  }
  async putOrganizer(req, res) {
    try {
      const id = req.params.id;
      const {
        OrganizadorID,
        NombreOrganizador,
        Facebook,
        Instagram,
        Web,
        Email,
        Telefono } = req.body;

      const editOrganizer = new Organizer(
        OrganizadorID,
        NombreOrganizador,
        Facebook,
        Instagram,
        Web,
        Email,
        Telefono);
      console.log("=====body =========");
      console.log(editOrganizer);
      console.log("=====body =========");

      editOrganizer.OrganizadorID = id;
      const result = await userService.putOrganizer(editOrganizer);

      res.redirect('/organizadores');

      //  if (result.success) {
      //    return res.status(200).json({ message: result.message });
      //  } else {
      //    return res.status(400).json({ message: result.message });
      //  }

    } catch (error) {
      console.log("=====E R R O R =========")
      console.log(req.body);
      console.log("=====E R R O R =========")
      //return res.render('organizadores/editar', { errores: [result.message] });
      return res.render('organizadores/editar', { errores: [error.message], organizer: req.body });
    }
  }

  async inscribirOrganizer(req, res) {
    try {
      const id = parseInt(req.params.id);
      await organizerService.inscribirOrganizer(req.user.userId, id);
      res.redirect('/organizadores');
    } catch (error) {
      res.status(500).send('Error al inscribir.');
    }
  }


  async verlistaInscritos(req, res) {
    try {
      const id = parseInt(req.params.id);
      const inscritos = await organizerService.verlistaInscritos(id);
      res.render('organizadores/inscritos', {
        inscritos: JSON.stringify(inscritos), // ✅ necesario
        user: req.user.userId,
        tipousuario: req.user.tipousuario,
        username: req.user.username
      });

    } catch (error) {
      res.status(500).send('Error al cargar la lista de inscritos.');
    }
  }

}
module.exports = new organizerController();
