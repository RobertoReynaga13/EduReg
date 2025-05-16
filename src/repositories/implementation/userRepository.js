const { sql, poolPromise } = require('../../config/db');
const UserModel = require('../../models/userModel');
const IUserRepository = require('../repository_interface/IUserRepository');


class UserRepository extends IUserRepository {
    async getAllUsers() {
        try {
            const pool = await poolPromise;
            const request = pool.request();
            const result = await request.execute('sp_GET_PersonalLogistica');
            return result.recordset.map(row => new UserModel(row));
        } catch (error) {
            console.error('Error obteniendo personal de logistica:', error);
            throw error;
        }
    }


    async postUser(UserModel) {
        try {
            // Obtener el pool de conexiones
            const pool = await poolPromise;
            console.log('Parámetros a enviar:', {
                UsuarioID: UserModel.UsuarioID,
                AreaResponsable: UserModel.AreaResponsable,
            });
            // Preparar y ejecutar la consulta para insertar el blog
            const result = await pool.request()
                .input('Param1', sql.Int, UserModel.UsuarioID)
                .input('Param2', sql.NVarChar, UserModel.AreaResponsable)
                .execute('sp_POST_PersonalLogistica');

            console.log('Personal de Logistica añadido correctamente');
            return result; // Puedes devolver algún resultado si lo necesitas
        } catch (error) {
            console.error('Error añadiendo el personal de logística:', error);
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const pool = await poolPromise;
            const result = await pool.request().input('Param1', sql.Int, id).execute('sp_GET_PersonalLogisticaById');
            const row = result.recordset[0];
            return new UserModel({
                PersonalID: id, // PersonalID would come from the id passed to the function
                UsuarioID: null,
                Nombre: null,
                Correo: null,
                AreaResponsable: row.AreaResponsable
            });
        } catch (error) {
            console.error('Error obteniendo el usuario:', error);
            throw error;
        }
    }

    async putUser(UserModel) {
        try {
            const pool = await poolPromise;
            console.log('Parámetros a enviar:', {
                AreaResponsable: UserModel.AreaResponsable,
            });
            const result = await pool.request()
                .input('Param1', sql.NVarChar, UserModel.AreaResponsable)
                .input('Param2', sql.Int, UserModel.PersonalID) // Asegúrate de que PersonalID es el ID correcto
                .execute('sp_PUT_PersonalLogistica');

            console.log('Personal de Logistica actualizado correctamente');
            return result; // Puedes devolver algún resultado si lo necesitas
        } catch (error) {
            console.error('Error actualizando el usuario:', error);
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('Param1', sql.Int, id)
                .execute('sp_DELETE_PersonalLogistica');
            return result; // Puedes devolver algún resultado si lo necesitas
        } catch (error) {
            console.error('Error eliminando el personal de logistica:', error);
            throw error;
        }
    }

}

module.exports = new UserRepository();
