const countryModel = require('../../models/countryModel');

class ICountryService {
  async getCountries() { }
  async getCountry(id) { }
  async postCountry(countryModel){}
  async putCountry(countryrModel){}
  async deleteCountry(id) {}
}

module.exports = ICountryService;