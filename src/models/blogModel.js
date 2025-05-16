

class blogModel {

    constructor({ PonenteID = null, UsuarioID, Nombre = null, Correo = null, Especialidad, TituloPonencias, NecesidadesEspecificas }) {
        this.PonenteID = PonenteID;
        this.UsuarioID = UsuarioID;
        this.Nombre = Nombre;
        this.Correo = Correo;
        this.Especialidad = Especialidad;
        this.TituloPonencias = TituloPonencias;
        this.NecesidadesEspecificas = NecesidadesEspecificas;
    }

}
module.exports = blogModel;
