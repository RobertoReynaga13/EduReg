const Joi = require('joi');

class organizerModel {
  constructor({EventoID, Nombre, Fecha, Ubicacion, Descripcion, NombreOrganizador}) {
    this.EventoID = EventoID;
    this.Nombre = Nombre;
    this.Fecha = Fecha;
    this.Ubicacion = Ubicacion;
    this.Descripcion = Descripcion;
    this.NombreOrganizador = NombreOrganizador;
  }
}

module.exports = organizerModel;
