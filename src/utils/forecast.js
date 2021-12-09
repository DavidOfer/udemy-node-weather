const fetch= require('node-fetch');
const forecast = async (latitude, longitude) => {
    const forecastURL = `http://api.weatherstack.com/current?access_key=274195d851878ec49642b4604eafd46a&query=${latitude},${longitude}`
    const response = await fetch(forecastURL);
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    const data = await response.json();
    return data;
}
module.exports = forecast;