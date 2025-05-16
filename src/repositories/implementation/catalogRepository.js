const { sql, poolPromise } = require('../../config/db');
const catalogModel = require('../../models/catalogModel');
const ICatalogRepository = require('../repository_interface/ICatalogRepository');

class CatalogRepository extends ICatalogRepository {
  async getCatOrganizers() {
    try {
      const pool = await poolPromise;
      const request = pool.request();
      request.input('Param1', 'text');

      const result = await request.execute('sp_GET_CatOrganizadores');
      return result.recordset.map(row => new catalogModel(
        row.Id,
        row.Descripcion
      ));
    } catch (error) {
        console.error('Err:', error);
        throw error;
    }
  }

  async getCatLocations(){
    try{
      const pool = await poolPromise;
      const request = pool.request();
      request.input('Param1', 'text');

      const result = await request.execute('sp_GET_CatUbicaciones');
      return result.recordset.map(row => new catalogModel(
        row.Id,
        row.Descripcion
      ));
    }catch(error){
      console.log('Err:', error);
      throw error;
    }
  }

  async getCatCountries(){
    try{
      const pool = await poolPromise;
      const request = pool.request();
      request.input('Param1', 'text');

      const result = await request.execute('sp_GET_CatPaises');
      return result.recordset.map(row => new catalogModel(
        row.Id,
        row.Descripcion
      ));
    }catch(error){
      console.log('Err:', error);
      throw error;
    }
  }

  async getCatStates(){
    try{
      const pool = await poolPromise;
      const request = pool.request();
      request.input('Param1', 'text');

      const result = await request.execute('sp_GET_CatEstados');
      return result.recordset.map(row => new catalogModel(
        row.Id,
        row.Descripcion
      ));
    }catch(error){
      console.log('Err:', error);
      throw error;
    }
  }

}
module.exports = new CatalogRepository();
