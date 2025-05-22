const Joi = require('joi');

class eventosModel {
  constructor({EventoID, Nombre, Fecha, Ubicacion}) {
    this.EventoID = EventoID;
    this.Nombre = Nombre;
    this.Fecha = Fecha;
    this.Ubicacion = Ubicacion;
  }
}

module.exports = eventosModel;
