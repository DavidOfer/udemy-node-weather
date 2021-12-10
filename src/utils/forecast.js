const fetch= require('node-fetch');
const globals = require('../globals.js')
const forecast = async (latitude, longitude) => {
    const forecastURL = `http://api.weatherstack.com/current?access_key=${globals.weatherStackKey}&query=${latitude},${longitude}`
    const response = await fetch(forecastURL);
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const data = await response.json();
    return data;
}
module.exports = forecast;