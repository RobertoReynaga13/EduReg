const { sql, poolPromise } = require('../../config/db');
const comiteOrganizadorModel = require('../../models/comiteOrganizadorModel');
const IRaceRepository = require('../repository_interface/IRaceRepository');

class RaceRepository extends IRaceRepository {
  async getRaces() {
    try {
      const pool = await poolPromise;
      const request = pool.request();
      const result = await request.execute('sp_GET_Comite_Oragnizador');

      console.log(result);

      return result.recordset.map(row => new comiteOrganizadorModel(
        row.OrganizadorID,
        row.Nombre,
        row.Correo));
    } catch (error) {
        console.error('Err:', error);
        throw error;
    }
  }
  async getRace(id){
    try {
      const pool = await poolPromise;
      const request = pool.request();
      request.input('Param1', 'text');
      request.input('Param2', id);
      const result = await request.execute('sp_GET_Carrera');

      if (result.recordset.length > 0) {
        const row = result.recordset[0];
        return new raceModel(
          row.CarreraID,
          row.Titulo,
          row.Descripcion,
          row.OrganizadorId,
          row.UbicacionId,
          row.PaisId,
          row.Publicado
        );
      } else {
        return null; // O lanza un error si no se encuentra el organizador
      }
    } catch (error) {
        console.error('Err:', error);
        throw error;
    }
  }
  async postRace(raceModel, userId) {
    try{
      const pool = await poolPromise;
      const request = pool.request();

      const Fecha = DateTime.fromJSDate(raceModel.Fecha).setZone('America/Mexico_City').toUTC().toISO();
      console.log('==========F E C H A');
      console.log(Fecha);
      console.log('==========F E C H A');

      request.input('Param1', 'text');
      request.input('Param2', raceModel.Titulo);
      request.input('Param3', raceModel.Descripcion);
      request.input('Param4', Fecha);
      request.input('Param5', raceModel.UbicacionId);
      request.input('Param6', raceModel.OrganizadorId);
      request.input('Param7', raceModel.Publicado);
      request.input('Param8', userId);

      const result = await request.execute('sp_POST_EventosCarrera');

      console.log('==== result');
      console.log(result);

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
  async putRace(raceModel) {
    try{
      const pool = await poolPromise;
      const request = pool.request();

      request.input('Param1', 'text');
      request.input('Param2', raceModel.Titulo);
      request.input('Param3', raceModel.Descripcion);
      request.input('Param4', raceModel.Fecha);
      request.input('Param5', raceModel.OrganizadorId);
      request.input('Param6', raceModel.UbicacionId);

      const result = await request.execute('sp_PUT_Carrera');

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
  async deleteRace(raceModel){
    try{
      const pool = await poolPromise;
      const request = pool.request();
      request.input('Param1', 'text');
      request.input('Param2', id);
      const result = await request.execute('sp_DELETE_Carrera');

      if (result.recordset.length > 0) {
        const row = result.recordset[0];
        return new raceModel(
          row.CarreraID,
          row.Titulo,
          row.Descripcion,
          row.OrganizadorId,
          row.UbicacionId,
          row.PaisId,
          row.Publicado
        );
      } else {
        return null; // O lanza un error si no se encuentra el organizador
      }

    }catch(error){
      console.log('Err:', error);
      throw error;
    }
  }
}
module.exports = new RaceRepository();
