const Joi = require('joi');
const Swal = require('sweetalert2');


class countryModel {
    constructor({ EstudianteID = null, UsuarioID, Nombre = null, Correo = null, NumControl }) {
        this.EstudianteID = EstudianteID;
        this.UsuarioID = UsuarioID;
        this.Nombre = Nombre;
        this.Correo = Correo;
        this.NumControl = NumControl;
    }
}
module.exports = countryModel;
