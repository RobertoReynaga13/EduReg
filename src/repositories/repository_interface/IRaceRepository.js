const raceModel = require('../../models/raceModel');

class IRaceRepository {
  async getRaces() {}
  async getRace(id){}
  async postRace(raceModel, userId){}
  async putRace(raceModel){}
  async deleteRace(id){}
}

module.exports = IRaceRepository;
