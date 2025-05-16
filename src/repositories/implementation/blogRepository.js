const { sql, poolPromise } = require('../../config/db');
const blogModel = require('../../models/blogModel');
const IBlogRepository = require('../repository_interface/IBlogRepository');

class BlogRepository extends IBlogRepository {
    async getAllBlogs() {
        try {
            const pool = await poolPromise;
            const request = pool.request();
            const result = await request.execute('sp_GET_Ponentes');

            return result.recordset.map(row => new blogModel(row)
            );
        } catch (error) {
            console.error('Error obteniendo los blogs:', error);
            throw error;
        }
    }

    async getBlog(id) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().input('Param1', sql.Int, id).execute('sp_GET_Ponente');
            const row = result.recordset[0];

            if (!row) {
                throw new Error(`Blog con ID ${id} no encontrado`);
            }

            return new blogModel({
                PonenteID: id, // PonenteID would come from the id passed to the function
                UsuarioID: null,  // Assuming null for UsuarioID if it's not returned by the stored procedure
                Nombre: null,     // Null for Nombre as requested
                Correo: null,     // Null for Correo as requested
                Especialidad: row.Especialidad,
                TituloPonencias: row.TituloPonencias,
                NecesidadesEspecificas: row.NecesidadesEspecificas
            });
        } catch (error) {
            console.error('Error obteniendo el blog:', error);
            throw error;
        }
    }

    async postBlog(blogModel) {
        try {
            // Obtener el pool de conexiones
            const pool = await poolPromise;
            console.log('Parámetros a enviar:', {
                UsuarioID: blogModel.UsuarioID,
                Especialidad: blogModel.Especialidad,
                TituloPonencias: blogModel.TituloPonencias,
                NecesidadesEspecificas: blogModel.NecesidadesEspecificas,
            });
            // Preparar y ejecutar la consulta para insertar el blog
            const result = await pool.request()
                .input('Param1', sql.Int, blogModel.UsuarioID)
                .input('Param2', sql.NVarChar, blogModel.Especialidad)
                .input('Param3', sql.NVarChar, blogModel.TituloPonencias)
                .input('Param4', sql.NVarChar, blogModel.NecesidadesEspecificas)
                .execute('sp_POST_Ponente');

            console.log('Ponente añadido correctamente');
            return result; // Puedes devolver algún resultado si lo necesitas
        } catch (error) {
            console.error('Error añadiendo el ponente:', error);
            throw error;
        }
    }

    async putBlog(blogModel) {
        try {
            // Obtener el pool de conexiones
            const pool = await poolPromise;
            console.log('Parámetros a actualizar:', {
                Especialidad: blogModel.Especialidad,
                TituloPonencias: blogModel.TituloPonencias,
                NecesidadesEspecificas: blogModel.NecesidadesEspecificas,
            });

            // Preparar y ejecutar la consulta para actualizar el blog
            const result = await pool.request()
                .input('Param1', sql.NVarChar, blogModel.Especialidad)
                .input('Param2', sql.NVarChar, blogModel.TituloPonencias)
                .input('Param3', sql.NVarChar, blogModel.NecesidadesEspecificas)
                .input('Param4', sql.Int, blogModel.PonenteID) // El ID del blog que se va a actualizar
                .execute('sp_PUT_Ponente'); // El nombre del procedimiento almacenado para actualizar el blog

            console.log('Ponente actualizado correctamente');
            return result; // Puedes devolver algún resultado si lo necesitas
        } catch (error) {
            console.error('Error actualizando el ponente:', error);
            throw error;
        }
    }

    async deleteBlog(id) {
        try {
            const pool = await poolPromise;
            // Ejecutar el procedimiento almacenado para eliminar el blog
            const result = await pool.request()
                .input('Param1', sql.Int, id)
                .execute('sp_DELETE_Ponente');

            // Verificar si el procedimiento afectó filas
            if (result.rowsAffected[0] === 0) {
                throw new Error(`Blog con ID ${id} no encontrado o no pudo ser eliminado`);
            }

            // Retornar una confirmación o un mensaje de éxito
            return { message: `Blog con ID ${id} eliminado correctamente.` };
        } catch (error) {
            console.error('Error eliminando el blog:', error);
            throw error;
        }
    }

}

module.exports = new BlogRepository();
