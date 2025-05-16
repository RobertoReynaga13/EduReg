const { sql, poolPromise } = require('../../config/db');
const countryModel = require('../../models/countryModel');
const ICountryRepository = require('../repository_interface/ICountryRepository');

class CountryRepository extends ICountryRepository {
  async getCountries() {
    try {
      const pool = await poolPromise;
      const request = pool.request();
      const result = await request.execute('sp_GET_Estudiantes');

      return result.recordset.map(row => new countryModel(row));
    } catch (error) {
      console.error('Err:', error);
      throw error;
    }
  }

  async getCountry(id){
    try {
      const pool = await poolPromise;
      const request = pool.request();
      request.input('Param1', 'text');
      request.input('Param2', id);
      const result = await request.execute('sp_GET_Pais');

      if (result.recordset.length > 0) {
        const row = result.recordset[0]; // Obtiene el primer registro
        return new countryModel(
          row.PaisID,
          row.NombrePais,
          row.CodigoISO,
        );
      } else {
        return null; // O lanza un error si no se encuentra el organizador
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
    });
        throw error;
    }
  }

  async postCountry(countryModel) {
    try {
        // Obtener el pool de conexiones
        const pool = await poolPromise;
        // Preparar y ejecutar la consulta para insertar el blog
        const result = await pool.request()
             .input('Param1', sql.Int, countryModel.UsuarioID)
             .input('Param2', sql.NVarChar, countryModel.NumControl)
            
            .execute('sp_POST_Estudiante');

        console.log('Estudiante añadido correctamente');
        return result; // Puedes devolver algún resultado si lo necesitas
    } catch (error) {
        console.error('Error añadiendo el estudiante:', error);
        throw error;
    }
}

  async putCountry(countryModel) {
    try {
      // Obtener el pool de conexiones
      const pool = await poolPromise;
      // console.log('Parámetros a actualizar:', {
      //   BlogID: blogModel.BlogID, // Asegúrate de que tengas el ID del blog para actualizar
      //   Titulo: blogModel.Titulo,
      //   DescripcionCorta: blogModel.DescripcionCorta,
      //   DescripcionLarga: blogModel.DescripcionLarga,
      //   FechaPublicacion: blogModel.FechaPublicacion,
      //   Publicado: blogModel.Publicado,
      //   Tags: blogModel.Tags,
      //   ImageURL: blogModel.ImageURL,
      //   VideoURL: blogModel.VideoURL
      // });

      // Preparar y ejecutar la consulta para actualizar el blog
      const result = await pool.request()
        .input('Param1', sql.NVarChar, "text")
        .input('Param2', sql.NVarChar, countryModel.NombrePais)
        .input('Param3', sql.NVarChar, countryModel.CodigoISO)
        .input('Param4', sql.Int, countryModel.PaisID)
        .execute('sp_PUT_Pais'); // El nombre del procedimiento almacenado para actualizar el blog

      console.log('Pais actualizado correctamente');
      return result; // Puedes devolver algún resultado si lo necesitas
    } catch (error) {
      console.error('Error actualizando el pais:', error);
      throw error;
    }
  }

  async deleteCountry(id) {
    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .input('Param1', sql.Int, id)
            .execute('sp_DELETE_Estudiante');

        if (result.rowsAffected[0] === 0) {
            throw new Error(`Estudiante con ID ${id} no encontrado o no pudo ser eliminado`);
        }

        return { message: `Estudiante con ID ${id} eliminado correctamente.` };
    } catch (error) {
        console.error('Error eliminando el estudiante:', error);
        throw error;
    }
}
}
module.exports = new CountryRepository();