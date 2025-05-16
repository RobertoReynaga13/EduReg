class responseModel {
  constructor(Resultado, UsuarioId, Email, Mensaje) {
      this.Resultado = Resultado;
      this.UsuarioId = UsuarioId;
      this.Email = Email;
      this.Mensaje = Mensaje;
  }
}
module.exports = responseModel;
