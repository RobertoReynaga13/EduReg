class userModel {
  constructor({PersonalID = null, UsuarioID, Nombre = null, Correo = null, AreaResponsable}) {
    this.PersonalID = PersonalID;
    this.UsuarioID = UsuarioID;
    this.Nombre = Nombre;
    this.Correo = Correo;
    this.AreaResponsable = AreaResponsable;
}
}
module.exports = userModel;
