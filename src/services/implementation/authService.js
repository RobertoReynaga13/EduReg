require('dotenv').config();
const IAuthService = require('../service_interface/IAuthService');
const authRepository = require('../../repositories/implementation/authRepository');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;
if (!secretKey) {
    throw new Error('SECRET_KEY no está definida en el archivo .env');
}

class AuthService extends IAuthService {
    async login(email, password) {
        try {
            const userRecord = await authRepository.getUserByEmail(email);

            if (userRecord.length === 0) {
                return { success: false, message: 'Usuario no encontrado' };
            }

            const { Resultado, UsuarioId, Email } = userRecord[0];
            if (password !== Resultado) {
                return { success: false, message: 'Credenciales incorrectas' };
            }

            const token = jwt.sign({ userId: UsuarioId, username: Email }, secretKey, {
                expiresIn: '1h'
            });

            return { success: true, token, username: Email };
        } catch (error) {
            console.error('Error en login:', error);
            throw new Error('Error interno en la autenticación');
        }
    }

    async validateToken(token) {
        try {
            return jwt.verify(token, secretKey);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('El token ha expirado');
            } else {
                throw new Error('Token inválido');
            }
        }
    }

    async getUserInfo(id) {
            return await authRepository.getUserInfo(id);
    }

    async getEvents(id) {
        return await authRepository.getEvents(id);
        console.log('events', events);
    }
}

module.exports = new AuthService();