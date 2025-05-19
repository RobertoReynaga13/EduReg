const { sql, poolPromise } = require('../../config/db');
const eventosModel = require('../../models/eventosModel');
const organizerModel = require('../../models/organizerModel');
const responseModel = require('../../models/responseModel');
const usuarioModel = require('../../models/usuarioModel');
const IAuthRepository = require('../repository_interface/IAuthRepository');

class AuthRepository extends IAuthRepository {
  async getUserByEmail(email) {
    try {
      const pool = await poolPromise;
      const request = pool.request();
      request.input('Param1', email);
      const result = await request.execute('sp_GET_User');

      console.log('============ r e s u l t');
      console.log(result);
      console.log('============ r e s u l t');

      if (result.recordset.length > 0) {
        return result.recordset.map(row => new responseModel(
          row.Resultado,
          row.UsuarioId,
          row.Correo,
          row.TipoUsuario,
          row.Mensaje
        ));
      }
      return null;
    } catch (error) {
      console.error('Error al obtener organizadores:', error);
      throw error;
    }
  }

  async getUserInfo(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().input('Param1', sql.Int, id).execute('sp_GET_UsuarioPerfil');
      const row = result.recordset[0];


      return new usuarioModel({
        UsuarioID: id, // UsuarioID would come from the id passed to the function
        Nombre: row.Nombre,
        Correo: row.Correo,
        TipoUsuarioID: row.TipoUsuarioID || null,
        NombreTipo: row.NombreTipo || 'Sin tipo asignado'

      })
    } catch (error) {
      console.error('Error obteniendo el blog:', error);
      throw error;
    }

  }

  async getEvents(id) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().input('UsuarioID', sql.Int, id).execute('sp_GET_EventosInscritos');

      console.log(result);
      return result.recordset.map(row => new eventosModel(row))
    }
    catch (error) {
      console.error('Error obteniendo los eventos:', error);
      throw error;
    }
  }

  async postRegistro(name, email, password) {
    try {
      const pool = await poolPromise;
      const result = await pool.request()
        .input('Param1', sql.NVarChar, name)
        .input('Param2', sql.NVarChar, email)
        .input('Param3', sql.NVarChar, password)
        .execute('sp_registrar');

      return result;
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error;
    }
  }
}
module.exports = new AuthRepository();
