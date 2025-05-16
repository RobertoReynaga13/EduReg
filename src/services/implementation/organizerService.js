const IOrganizerService = require('../service_interface/IOrganizerService');
const organizerRepository = require('../../repositories/implementation/organizerRepository');
const organizerModel = require('../../models/organizerModel');

class OrganizerService extends IOrganizerService {
    async getOrganizers() {
      return await organizerRepository.getOrganizers();
    }
    async getOrganizer(id){
      return await organizerRepository.getOrganizer(id);
    }
    async postOrganizer(organizerModel){
      return await organizerRepository.postOrganizer(organizerModel);
    }
    async putOrganizer(organizerModel){
      try {
        const responseValue = await organizerRepository.putOrganizer(organizerModel);
        if (responseValue) {
            return { success: true, message: 'Se actualizo el registro' };
        }
        return { success: false, message: 'No se obtuvo respuesta válida.' };
      } catch (error) {
        console.error('Error en la capa de servicio:', error);
        return { success: false, message: 'Error al procesar la solicitud.' };
      }
    }

    async inscribirOrganizer(userId, id){
      return await organizerRepository.inscribirOrganizer(userId, id);
    }

    async verlistaInscritos(id){
      return await organizerRepository.verlistaInscritos(id);
    }
}
module.exports = new OrganizerService();
