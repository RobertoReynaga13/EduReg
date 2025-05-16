const ICatalogService = require('../service_interface/ICatalogService');
const CatalogRepository = require('../../repositories/implementation/catalogRepository');
const CatalogModel = require('../../models/catalogModel');

class CatalogService extends ICatalogService {
    async getCatOrganizers(){
      try {
        const result = await CatalogRepository.getCatOrganizers();

        if (result) {
            return { success: true, message: result };
        }

        return { success: false, message: 'No se obtuvo respuesta.' };
      } catch (error) {
        console.error('Error en la capa de servicio:', error);
        return { success: false, message: 'Error al procesar la solicitud.' };
      }
    }
    async getCatLocationes(){
      try {
        const result = await CatalogRepository.getCatLocations();

        if (result) {
            return { success: true, message: result };
        }

        return { success: false, message: 'No se obtuvo respuesta.' };
      } catch (error) {
        console.error('Error en la capa de servicio:', error);
        return { success: false, message: 'Error al procesar la solicitud.' };
      }
    }

    async getCatCountries(){
      try {
        const result = await CatalogRepository.getCatCountries();

        if (result) {
            return { success: true, message: result };
        }

        return { success: false, message: 'No se obtuvo respuesta.' };
      } catch (error) {
        console.error('Error en la capa de servicio:', error);
        return { success: false, message: 'Error al procesar la solicitud.' };
      }
    }

    async getCatStates(){
      try {
        const result = await CatalogRepository.getCatStates();

        if (result) {
            return { success: true, message: result };
        }

        return { success: false, message: 'No se obtuvo respuesta.' };
      } catch (error) {
        console.error('Error en la capa de servicio:', error);
        return { success: false, message: 'Error al procesar la solicitud.' };
      }
    }
}
module.exports = new CatalogService();
