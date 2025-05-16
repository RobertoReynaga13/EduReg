const countryModel = require('../../models/countryModel');

class ICountryRepository {
    async getCountries() { }
    async getCountry(id){}
    async postCountry(countryModel){}
    async putCountry(countryModel){}
    async deleteCountry(id) {}
}

module.exports = ICountryRepository;