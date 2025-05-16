const organizerModel = require('../../models/organizerModel');

class IOrganizerRepository {
  async getOrganizers() {}
  async getOrganizer(id){}
  async postOrganizer(organizerModel){}
  async putOrganizer(organizerModel){}
}

module.exports = IOrganizerRepository;
