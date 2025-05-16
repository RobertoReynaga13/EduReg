const locationModel = require('../../models/locationModel');

class ILocationRepository {
  async getLocations() {}
  async getLocation(id){}
  async postLocation(locationModel){}
  async putLocation(locationModel){}
  async deleteLocation(id){}
}

module.exports = ILocationRepository;
