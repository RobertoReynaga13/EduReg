const ILocationService = require('../service_interface/ILocationService');
const locationRepository = require('../../repositories/implementation/locationRepository');
const locationModel = require('../../models/locationModel');

class LocationService extends ILocationService {
    async getLocations() {
      return await locationRepository.getLocations();
    }
    async getLocation(id){
      return await locationRepository.getLocation(id);
    }
    async postLocation(locationModel){
      return await locationRepository.postLocation(locationModel);
    }
    async putLocation(locationModel){
      return await locationRepository.putLocation(locationModel);
    }
    
    async deleteLocation(id){
      return await locationRepository.deleteLocation(id);
  }
}
module.exports = new LocationService();
