class usuarioModel {
    constructor({UsuarioID = null, Nombre, Correo, TipoUsuarioID = null, NombreTipo}) {
      this.UsuarioID = UsuarioID;
      this.Nombre = Nombre;
      this.Correo = Correo;
      this.TipoUsuarioID = TipoUsuarioID;
      this.NombreTipo = NombreTipo;
  }
  }
  module.exports = usuarioModel;
  