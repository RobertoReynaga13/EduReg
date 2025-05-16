const { sql, poolPromise } = require('../../config/db');
const locationModel = require('../../models/locationModel');
const ILocationRepository = require('../repository_interface/ILocationRepository');

class LocationRepository extends ILocationRepository {
  async getLocations() {
    try {
      const pool = await poolPromise;
      const request = pool.request();
      const result = await request.execute('sp_GET_AsistentesExternos');
      console.log(result);
      return result.recordset.map(row => new locationModel(
        row.AsistenteID,
        row.Nombre,
        row.Correo
      ));
    } catch (error) {
        console.error('Err:', error);
        throw error;
    }
  }
  async getLocation(id){
    try {
      const pool = await poolPromise;
      const request = pool.request();
      request.input('Param1', 'text');
      request.input('Param2', id);
      const result = await request.execute('sp_GET_Ubicacion');

      if (result.recordset.length > 0) {
        const row = result.recordset[0]; // Obtiene el primer registro
        return new locationModel(
          row.UbicacionID,
          row.Lugar,
          row.Coordenadas,
          row.PaisID,
          row.EstadoID
        );
      } else {
        return null; // O lanza un error si no se encuentra el organizador
      }
    } catch (error) {
        console.error('Err:', error);
        throw error;
    }
  }
  async postLocation(locationModel) {
    try{
      const pool = await poolPromise;
      const request = pool.request();
      request.input('Param1', sql.Int, locationModel.UsuarioID);
      const result = await request.execute('sp_POST_AsistenteExterno');
    
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
  async putLocation(locationModel) {
    try {
      // Obtener el pool de conexiones
      const pool = await poolPromise;
      // Preparar y ejecutar la consulta para insertar el blog
      const result = await pool.request()
           .input('Param1', "text")
           .input('Param2', sql.NVarChar, locationModel.Lugar)
           .input('Param3', sql.NVarChar, locationModel.Coordenadas)
           .input('Param4', sql.Int, locationModel.PaisID)
           .input('Param5', sql.Int, locationModel.EstadoID)
           .input('Param6', sql.Int, locationModel.UbicacionID)
          .execute('sp_PUT_Ubicacion');

      console.log('País añadido correctamente');
      return result; // Puedes devolver algún resultado si lo necesitas
  } catch (error) {
      console.error('Error añadiendo el país:', error);
      throw error;
  }
  }

  async deleteLocation(id) {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input('Param1', 'text')
            .input('Param2', sql.Int, id)
            .execute('sp_DELETE_Ubicacion');

        if (result.rowsAffected[0] === 0) {
            throw new Error(`Ubicacion con ID ${id} no encontrado o no pudo ser eliminado`);
        }

        return { message: `Ubicacion con ID ${id} eliminado correctamente.` };
    } catch (error) {
        console.error('Error eliminando la ubicación:', error);
        throw error;
    }
}
}

module.exports = new LocationRepository();