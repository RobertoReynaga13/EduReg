const ICountryService = require('../service_interface/ICountryService')
const countryRepository = require('../../repositories/implementation/countryRepository')
const countryModel = require('../../models/countryModel');


class CountryService extends ICountryService {
  async getCountries() {
    return await countryRepository.getCountries();
  }

  async getCountry(id) {
    return await countryRepository.getCountry(id);
  }

  async postCountry(countryModel) {
    console.log(countryModel)
    return await countryRepository.postCountry(countryModel)
  }

  async putCountry(countryModel) {
    return await countryRepository.putCountry(countryModel);
  }

  async deleteCountry(id){
    return await countryRepository.deleteCountry(id);
  }
}

module.exports = new CountryService();