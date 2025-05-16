const IRaceService = require('../service_interface/IRaceService');
const RaceRepository = require('../../repositories/implementation/raceRepository');
const RaceModel = require('../../models/raceModel');

class RaceService extends IRaceService {
    async getRaces() {


      return await RaceRepository.getRaces();
    }
    async getRace(id){
      return await RaceRepository.getRace(id);
    }
    async postRace(RaceModel, userId){
      return await RaceRepository.postRace(RaceModel, userId);
    }
    async putRace(RaceModel){
      try {
        const responseValue = await RaceRepository.putRace(RaceModel);
        if (responseValue) {
            return { success: true, message: 'Se actualizo el registro' };
        }
        return { success: false, message: 'No se obtuvo respuesta válida.' };
      } catch (error) {
        console.error('Error en la capa de servicio:', error);
        return { success: false, message: 'Error al procesar la solicitud.' };
      }
    }
    async deleteRace(id){
      return await RaceRepository.deleteRace(id);
    }
}
module.exports = new RaceService();
