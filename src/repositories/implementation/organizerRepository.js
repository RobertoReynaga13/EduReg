const { sql, poolPromise } = require('../../config/db');
const organizerModel = require('../../models/organizerModel');
const usuarioModel = require('../../models/usuarioModel');
const IOrganizerRepository = require('../repository_interface/IOrganizerRepository');

class OrganizerRepository extends IOrganizerRepository {
  async getOrganizers() {
    try {
      const pool = await poolPromise;
      const request = pool.request();
      const result = await request.execute('sp_GET_Eventos');

      return result.recordset.map(row => new organizerModel(row));
    } catch (error) {
        console.error('Err:', error);
        throw error;
    }
  }
  async getOrganizer(id){
    try {
      const pool = await poolPromise;
      const request = pool.request();
      request.input('Param1', 'text');
      request.input('Param2', id);
      const result = await request.execute('sp_GET_OrganizadorID');

      if (result.recordset.length > 0) {
        const row = result.recordset[0]; // Obtiene el primer registro
        return new organizerModel(
          row.OrganizadorID,
          row.NombreOrganizador,
          row.Facebook,
          row.Instagram,
          row.Web,
          row.Email,
          row.Telefono
        );
      } else {
        return null; // O lanza un error si no se encuentra el organizador
      }
    } catch (error) {
        console.error('Err:', error);
        throw error;
    }
  }
  async postOrganizer(organizerModel) {
    try{
      const pool = await poolPromise;
      const request = pool.request();

      request.input('Param1', 'text');
      request.input('Param2', organizerModel.NombreOrganizador);
      request.input('Param3', organizerModel.Facebook);
      request.input('Param4', organizerModel.Instagram);
      request.input('Param5', organizerModel.Web);
      request.input('Param6', organizerModel.Email);
      request.input('Param7', organizerModel.Telefono);

      const result = await request.execute('sp_POST_Organizador');
      if(result.recordset && result.recordset.length > 0){
        const responseValue = result.recordset[0]?.RESPONSE;
        return responseValue;
      }
      return null;
    }catch(error){
      console.error('Err:', error);
      throw error;
    }
  }
  async putOrganizer(organizerModel) {
    try{
      const pool = await poolPromise;
      const request = pool.request();

      request.input('Param1', 'text');
      request.input('Param2', organizerModel.NombreOrganizador);
      request.input('Param3', organizerModel.Facebook);
      request.input('Param4', organizerModel.Instagram);
      request.input('Param5', organizerModel.Web);
      request.input('Param6', organizerModel.Email);
      request.input('Param7', organizerModel.Telefono);
      request.input('Param8', organizerModel.OrganizadorID);

      const result = await request.execute('sp_PUT_organizador');

      if(result.recordset && result.recordset.length > 0){
        const responseValue = result.recordset[0]?.RESPONSE;
        return responseValue;
      }
      return null;
    }catch(error){
      console.error('Err:', error);
      throw error;
    }
  }

  async inscribirOrganizer(userId, id) {
    try {
      const pool = await poolPromise;
      const request = pool.request();
      request.input('Param1', userId);
      request.input('Param2', id);
      const result = await request.execute('sp_POST_Inscribir');

     return result;
    } catch (error) {
        console.error('Err:', error);
        throw error;
    }
  }

  async verlistaInscritos(id) {
    try {
      const pool = await poolPromise;
      const request = pool.request();
      request.input('Param1', id);
      const result = await request.execute('sp_GET_UsuariosxEvento');

      return result.recordset.map(row => new usuarioModel(row));
    }
    catch (error) {
      console.error('Err:', error);
      throw error;
    } 
}
}
module.exports = new OrganizerRepository();
