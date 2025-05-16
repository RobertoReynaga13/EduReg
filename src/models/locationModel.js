const Joi = require('joi');

class locationModel{
    constructor(AsistenteID, Nombre, Correo) {
        this.AsistenteID = AsistenteID;
        this.Nombre = Nombre;
        this.Correo = Correo;
    }
}
module.exports = locationModel;