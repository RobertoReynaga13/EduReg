const Joi = require('joi');

class locationModel{
    constructor({AsistenteID = null, UsuarioID, Nombre = null, Correo = null}){
        this.AsistenteID = AsistenteID;
        this.UsuarioID = UsuarioID;
        this.Nombre = Nombre;
        this.Correo = Correo;
    }
}
module.exports = locationModel;