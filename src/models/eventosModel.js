const Joi = require('joi');

class eventosModel {
  constructor({Nombre, Fecha, Ubicacion}) {
    this.Nombre = Nombre;
    this.Fecha = Fecha;
    this.Ubicacion = Ubicacion;
  }
}

module.exports = eventosModel;
