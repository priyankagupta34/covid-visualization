export const CovidServices = {
    countryName,
    todaysSummary,
    countryWiseData,
    totalCount,
    listAllCountries
}

const axios = require('axios');
const server = 'https://api.covid19api.com/';

function countryName() {
    return axios.get(`https://api.ipdata.co/?api-key=test`);
}

function todaysSummary() {
    return axios.get(`${server}summary`);
}

function countryWiseData(country) {
    return axios.get(`${server}total/dayone/country/${country}`);
    // return axios.get(`${server}country/${country}`);
}

function totalCount() {
    return axios.get(`${server}world/total`);
}

function listAllCountries() {
    return axios.get(`${server}countries`);
}
