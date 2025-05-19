class responseModel {
  constructor(Resultado, UsuarioId, Correo, TipoUsuario, Mensaje) {
      this.Resultado = Resultado;
      this.UsuarioId = UsuarioId;
      this.Correo = Correo;
      this.TipoUsuario = TipoUsuario;
      this.Mensaje = Mensaje;
  }
}
module.exports = responseModel;
