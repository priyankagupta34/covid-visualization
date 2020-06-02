export const GenericDataService = {
    countryPopulation
}

const axios = require('axios');
function countryPopulation(country){
    Promise.all([
        axios.get('country-by-population.json'),
        axios.get('country-by-abbreviation.json')
    ]).then(response => {
        let countries = [];
            response[0].data.forEach(item => {
                response[1].data.forEach(item1 => {
                    if(item.country.toLowerCase() === item1.country.toLowerCase()){
                        const newData = {
                            country: item.country,
                            code: item1.abbreviation,
                            population: item.population
                        }
                        countries.push(newData);
                    }
                })
            })
    })
}